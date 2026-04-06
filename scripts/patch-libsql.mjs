/**
 * Patches @libsql packages to handle URL parsing failures on Vercel's runtime.
 * The `new URL()` constructor fails inside bundled node_modules on Vercel,
 * even though it works in route handlers. This patches all occurrences.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, join } from 'path'

const PATCH_MARKER = '__LIBSQL_URL_PATCHED__'

function patchFile(filePath, patches) {
  if (!existsSync(filePath)) return false
  let content = readFileSync(filePath, 'utf-8')
  if (content.includes(PATCH_MARKER)) return false

  let patched = false
  for (const { find, replace } of patches) {
    if (content.includes(find)) {
      content = content.replace(find, replace)
      patched = true
    }
  }

  if (patched) {
    content = `// ${PATCH_MARKER}\n` + content
    writeFileSync(filePath, content)
  }
  return patched
}

// Helper: safe URL constructor that falls back to a URL-like object
const safeUrlFn = `
function __safeNewURL(urlString) {
  try { return new URL(urlString); } catch {}
  const withSlash = urlString.endsWith('/') ? urlString : urlString + '/';
  try { return new URL(withSlash); } catch {}
  // Manual URL-like fallback
  const match = urlString.match(/^(\\w+:)\\/\\/([^/]+)(.*)/);
  if (match) {
    return {
      protocol: match[1],
      host: match[2],
      hostname: match[2].split(':')[0],
      port: match[2].includes(':') ? match[2].split(':')[1] : '',
      origin: match[1] + '//' + match[2],
      pathname: match[3] || '/',
      href: urlString.endsWith('/') ? urlString : urlString + '/',
      search: '',
      hash: '',
      toString() { return this.href; }
    };
  }
  throw new TypeError('Invalid URL: ' + urlString);
}
`

try {
  // 1. Patch @libsql/core/uri.js — encodeBaseUrl
  const uriPatches = [{
    find: 'return new URL(`${schemeText}${authorityText}${pathText}`);',
    replace: 'return __safeNewURL(`${schemeText}${authorityText}${pathText}`);',
  }]

  for (const variant of ['lib-esm', 'lib-cjs']) {
    const fp = resolve(`node_modules/@libsql/core/${variant}/uri.js`)
    if (patchFile(fp, uriPatches)) {
      // Inject the helper function at the top (after marker)
      let c = readFileSync(fp, 'utf-8')
      c = c.replace(PATCH_MARKER + '\n', PATCH_MARKER + '\n' + safeUrlFn)
      writeFileSync(fp, c)
      console.log(`[patch-libsql] Patched @libsql/core/${variant}/uri.js`)
    }
  }

  // 2. Patch @libsql/hrana-client/index.js — openHttp
  const hranaPatches = [{
    find: 'url instanceof URL ? url : new URL(url)',
    replace: 'url instanceof URL ? url : __safeNewURL(String(url))',
  }]

  for (const variant of ['lib-esm', 'lib-cjs']) {
    const fp = resolve(`node_modules/@libsql/hrana-client/${variant}/index.js`)
    if (patchFile(fp, hranaPatches)) {
      let c = readFileSync(fp, 'utf-8')
      c = c.replace(PATCH_MARKER + '\n', PATCH_MARKER + '\n' + safeUrlFn)
      writeFileSync(fp, c)
      console.log(`[patch-libsql] Patched @libsql/hrana-client/${variant}/index.js`)
    }
  }

  // 3. Patch @libsql/hrana-client/http*.js files that may also use new URL()
  for (const variant of ['lib-esm', 'lib-cjs']) {
    const dir = resolve(`node_modules/@libsql/hrana-client/${variant}`)
    for (const filename of ['http.js', 'http3.js', 'http3_close.js']) {
      const fp = join(dir, filename)
      if (!existsSync(fp)) continue
      const content = readFileSync(fp, 'utf-8')
      if (content.includes('new URL(') && !content.includes(PATCH_MARKER)) {
        let patched = `// ${PATCH_MARKER}\n${safeUrlFn}\n` + content.replace(/new URL\(([^)]+)\)/g, '__safeNewURL($1)')
        writeFileSync(fp, patched)
        console.log(`[patch-libsql] Patched @libsql/hrana-client/${variant}/${filename}`)
      }
    }
  }

  console.log('[patch-libsql] Done.')
} catch (error) {
  console.error('[patch-libsql] Patch failed:', error)
  process.exit(0) // Don't fail the build
}
