/**
 * Two patches for @libsql on Vercel's serverless runtime:
 *
 * 1. Replace cross-fetch with native fetch/Request/Headers/Response.
 *    node-fetch's Request class is incompatible with native globalThis.fetch.
 *
 * 2. Replace `new URL()` calls in @libsql packages with a safe fallback.
 *    `new URL()` fails inside node_modules on Vercel even for valid URLs.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs'
import { resolve, join } from 'path'

// ── Patch 1: cross-fetch → native fetch ──────────────────────────────

const CF_MARKER = '__CROSS_FETCH_NATIVE_V1__'

const nativePonyfill = `// ${CF_MARKER}
const _fetch = globalThis.fetch.bind(globalThis);
_fetch.ponyfill = true;
module.exports = exports = _fetch;
exports.fetch = _fetch;
exports.Headers = globalThis.Headers;
exports.Request = globalThis.Request;
exports.Response = globalThis.Response;
exports.default = _fetch;
`

let cfCount = 0
const crossFetchPaths = [
  resolve('node_modules/cross-fetch/dist/node-ponyfill.js'),
  resolve('node_modules/@libsql/hrana-client/node_modules/cross-fetch/dist/node-ponyfill.js'),
]
for (const fp of crossFetchPaths) {
  if (!existsSync(fp)) continue
  writeFileSync(fp, nativePonyfill)
  cfCount++
}
console.log(`[patch-libsql] Patched ${cfCount} cross-fetch entry point(s).`)

// ── Patch 2: new URL() → __safeNewURL() ─────────────────────────────

const URL_MARKER = '__LIBSQL_URL_PATCHED_V3__'

// Saved reference to the real URL constructor, before any module-level
// replacement can shadow it. The function tries native URL first and
// falls back to a manually-parsed URL-like object.
const safeUrlFn = `
var __OriginalURL = typeof URL !== 'undefined' ? URL : undefined;
function __safeNewURL(urlString, base) {
  if (typeof __OriginalURL !== 'undefined') {
    if (urlString instanceof __OriginalURL) return urlString;
  }
  var s = String(urlString);
  if (typeof __OriginalURL !== 'undefined') {
    try {
      return base !== undefined
        ? new __OriginalURL(s, base)
        : new __OriginalURL(s);
    } catch (_) {}
  }
  // Manual fallback: resolve base + relative
  if (base !== undefined) {
    var baseStr = (base && typeof base === 'object' && base.href)
      ? base.href : String(base);
    if (!baseStr.endsWith('/')) baseStr += '/';
    var full = baseStr + s;
    // Try native again with the fully-resolved string
    if (typeof __OriginalURL !== 'undefined') {
      try { return new __OriginalURL(full); } catch (_) {}
    }
    return __parseUrl(full);
  }
  return __parseUrl(s);
}
function __parseUrl(s) {
  var m = s.match(/^(\\w+:)\\/\\/([^/?#]+)([^?#]*)(\\?[^#]*)?(#.*)?$/);
  if (!m) throw new TypeError('Invalid URL: ' + s);
  var hostParts = m[2].split(':');
  return {
    protocol: m[1], host: m[2],
    hostname: hostParts[0],
    port: hostParts.length > 1 ? hostParts[1] : '',
    origin: m[1] + '//' + m[2],
    pathname: m[3] || '/',
    search: m[4] || '', hash: m[5] || '',
    href: m[1] + '//' + m[2] + (m[3] || '/') + (m[4] || '') + (m[5] || ''),
    searchParams: new URLSearchParams(m[4] || ''),
    toString: function() { return this.href; }
  };
}
`

function findJsFiles(dir) {
  const results = []
  if (!existsSync(dir)) return results
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const stat = statSync(full)
    if (stat.isDirectory()) results.push(...findJsFiles(full))
    else if (entry.endsWith('.js')) results.push(full)
  }
  return results
}

let urlCount = 0
const urlDirs = [
  resolve('node_modules/@libsql/core'),
  resolve('node_modules/@libsql/hrana-client'),
  resolve('node_modules/@libsql/client'),
]
for (const dir of urlDirs) {
  for (const file of findJsFiles(dir)) {
    let content = readFileSync(file, 'utf-8')
    if (content.includes(URL_MARKER)) continue
    if (!content.includes('new URL(')) continue
    const patched = content.replace(/\bnew URL\(/g, '__safeNewURL(')
    if (patched !== content) {
      writeFileSync(file, `// ${URL_MARKER}\n${safeUrlFn}\n${patched}`)
      urlCount++
    }
  }
}
console.log(`[patch-libsql] Patched ${urlCount} files with __safeNewURL.`)
