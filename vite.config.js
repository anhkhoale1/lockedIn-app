import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiProxyPrefix = env.VITE_API_PROXY_PREFIX || '/api'
  const apiProxyTarget = env.VITE_API_PROXY_TARGET

  return {
    plugins: [react()],
    server: {
      proxy: apiProxyTarget
        ? {
            [apiProxyPrefix]: {
              target: apiProxyTarget,
              changeOrigin: true,
              rewrite: (path) => (path.startsWith(apiProxyPrefix) ? path.slice(apiProxyPrefix.length) || '/' : path),
            },
          }
        : undefined,
    },
  }
})
