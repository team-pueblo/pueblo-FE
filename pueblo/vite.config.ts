import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import JavaScriptObfuscator from 'javascript-obfuscator'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
  define: {
    'import.meta.env.VITE_SENTRY_RELEASE': JSON.stringify(env.VITE_SENTRY_RELEASE || process.env.VERCEL_GIT_COMMIT_SHA || ''),
  },
  plugins: [react(), {
    name: 'pueblo-obfuscate',
    apply: 'build',
    enforce: 'post',
    renderChunk(code) {
      if (mode !== 'obfuscated') return null
      // Transform before Rollup computes asset hashes and module references.
      return {
        code: JavaScriptObfuscator.obfuscate(code, {
          target: 'browser-no-eval',
          compact: true,
          seed: 37,
          identifierNamesGenerator: 'hexadecimal',
          renameGlobals: false,
          renameProperties: false,
          ignoreImports: true,
          controlFlowFlattening: false,
          deadCodeInjection: false,
          debugProtection: false,
          selfDefending: false,
          disableConsoleOutput: false,
          stringArray: true,
          stringArrayThreshold: 0.3,
          sourceMap: false,
        }).getObfuscatedCode(),
        map: null,
      }
    },
  }],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  }
})
