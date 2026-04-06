/**
 * Patches @libsql/core's encodeBaseUrl function to handle URL parsing
 * failures gracefully. On some serverless runtimes (Vercel), new URL()
 * fails with valid URLs due to environment-specific issues.
 */
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const filePath = resolve('node_modules/@libsql/core/lib-esm/uri.js')

try {
  let content = readFileSync(filePath, 'utf-8')

  if (content.includes('PATCHED_ENCODE_BASE_URL')) {
    console.log('[patch-libsql] Already patched, skipping.')
    process.exit(0)
  }

  // Replace the encodeBaseUrl function with a patched version
  const original = `return new URL(\`\${schemeText}\${authorityText}\${pathText}\`);`
  const patched = `// PATCHED_ENCODE_BASE_URL: fallback for runtimes where new URL() fails
    const urlString = \`\${schemeText}\${authorityText}\${pathText}\`;
    try {
        return new URL(urlString);
    } catch {
        // Fallback: construct a URL-like object that has the properties the library needs
        const withSlash = urlString.endsWith('/') ? urlString : urlString + '/';
        try { return new URL(withSlash); } catch { /* continue to manual fallback */ }
        return {
            origin: \`\${schemeText}//\${authorityText.replace('//', '')}\`,
            pathname: pathText || '/',
            href: withSlash,
            toString() { return withSlash; }
        };
    }`

  if (!content.includes(original)) {
    console.log('[patch-libsql] Target code not found, trying CJS...')
    // Try CJS version too
    const cjsPath = resolve('node_modules/@libsql/core/lib-cjs/uri.js')
    let cjsContent = readFileSync(cjsPath, 'utf-8')
    if (cjsContent.includes(original)) {
      cjsContent = cjsContent.replace(original, patched)
      writeFileSync(cjsPath, cjsContent)
      console.log('[patch-libsql] Patched CJS version.')
    }
  } else {
    content = content.replace(original, patched)
    writeFileSync(filePath, content)
    console.log('[patch-libsql] Patched ESM version.')
  }

  // Also patch CJS version if it exists
  const cjsPath = resolve('node_modules/@libsql/core/lib-cjs/uri.js')
  try {
    let cjsContent = readFileSync(cjsPath, 'utf-8')
    const cjsOriginal = 'return new URL(`${schemeText}${authorityText}${pathText}`);'
    if (cjsContent.includes(cjsOriginal) && !cjsContent.includes('PATCHED_ENCODE_BASE_URL')) {
      cjsContent = cjsContent.replace(cjsOriginal, patched)
      writeFileSync(cjsPath, cjsContent)
      console.log('[patch-libsql] Patched CJS version.')
    }
  } catch {
    // CJS version may not exist
  }
} catch (error) {
  console.error('[patch-libsql] Patch failed:', error)
  process.exit(0) // Don't fail the build
}
