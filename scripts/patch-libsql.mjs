/**
 * Patches cross-fetch to re-export native fetch/Request/Headers/Response.
 *
 * On Vercel's Node.js runtime, @libsql/hrana-client imports Request/Headers
 * from cross-fetch (which delegates to node-fetch). These node-fetch classes
 * are incompatible with the native globalThis.fetch used at runtime, causing
 * HTTP 404 errors when hrana-client constructs Request objects with node-fetch's
 * Request class and passes them to native fetch.
 *
 * Fix: replace cross-fetch's entry point with native API re-exports.
 */
import { writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const PATCH_MARKER = '__CROSS_FETCH_NATIVE_V1__'

const nativePonyfill = `// ${PATCH_MARKER}
// Patched: re-export native fetch APIs instead of node-fetch
const _fetch = globalThis.fetch.bind(globalThis);
_fetch.ponyfill = true;
module.exports = exports = _fetch;
exports.fetch = _fetch;
exports.Headers = globalThis.Headers;
exports.Request = globalThis.Request;
exports.Response = globalThis.Response;
exports.default = _fetch;
`

let patchCount = 0

try {
  const crossFetchPaths = [
    resolve('node_modules/cross-fetch/dist/node-ponyfill.js'),
    resolve('node_modules/@libsql/hrana-client/node_modules/cross-fetch/dist/node-ponyfill.js'),
  ]

  for (const filePath of crossFetchPaths) {
    if (!existsSync(filePath)) continue
    writeFileSync(filePath, nativePonyfill)
    patchCount++
  }

  console.log(`[patch-libsql] Patched ${patchCount} cross-fetch entry point(s) to use native fetch.`)
} catch (error) {
  console.error('[patch-libsql] Patch failed:', error)
  process.exit(0)
}
