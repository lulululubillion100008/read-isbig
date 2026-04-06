/**
 * Patches all @libsql packages to replace `new URL()` calls with a safe fallback.
 * On Vercel's serverless runtime, `new URL()` fails inside bundled node_modules
 * even for valid URLs. This patches every .js file that uses `new URL(`.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs'
import { resolve, join } from 'path'

const PATCH_MARKER = '__LIBSQL_URL_PATCHED_V2__'

const safeUrlFn = `
function __safeNewURL(urlString) {
  if (urlString instanceof URL) return urlString;
  var s = String(urlString);
  try { return new URL(s); } catch (e) {}
  var withSlash = s.endsWith('/') ? s : s + '/';
  try { return new URL(withSlash); } catch (e) {}
  var match = s.match(/^(\\w+:)\\/\\/([^/?#]+)([^?#]*)(\\?[^#]*)?(#.*)?$/);
  if (match) {
    return {
      protocol: match[1],
      host: match[2],
      hostname: match[2].split(':')[0],
      port: match[2].includes(':') ? match[2].split(':')[1] : '',
      origin: match[1] + '//' + match[2],
      pathname: match[3] || '/',
      search: match[4] || '',
      hash: match[5] || '',
      href: s.endsWith('/') || match[3] ? s : s + '/',
      toString: function() { return this.href; }
    };
  }
  throw new TypeError('Invalid URL: ' + s);
}
`

function findJsFiles(dir) {
  const results = []
  if (!existsSync(dir)) return results
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      results.push(...findJsFiles(full))
    } else if (entry.endsWith('.js')) {
      results.push(full)
    }
  }
  return results
}

let patchCount = 0

try {
  const dirs = [
    resolve('node_modules/@libsql/core'),
    resolve('node_modules/@libsql/hrana-client'),
    resolve('node_modules/@libsql/client'),
  ]

  for (const dir of dirs) {
    for (const file of findJsFiles(dir)) {
      let content = readFileSync(file, 'utf-8')
      if (content.includes(PATCH_MARKER)) continue
      if (!content.includes('new URL(')) continue

      // Replace all `new URL(x)` with `__safeNewURL(x)`
      // but not `x instanceof URL` checks
      const patched = content.replace(/\bnew URL\(/g, '__safeNewURL(')

      if (patched !== content) {
        writeFileSync(file, `// ${PATCH_MARKER}\n${safeUrlFn}\n${patched}`)
        patchCount++
      }
    }
  }

  console.log(`[patch-libsql] Patched ${patchCount} files.`)
} catch (error) {
  console.error('[patch-libsql] Patch failed:', error)
  process.exit(0)
}
