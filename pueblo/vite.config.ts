import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  return {
  define: {
    'import.meta.env.VITE_SENTRY_RELEASE': JSON.stringify(env.VITE_SENTRY_RELEASE || process.env.VERCEL_GIT_COMMIT_SHA || ''),
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  }
})
