import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   https: {
  //     key: './cert/localhost-privateKey.key',
  //     cert: './cert/localhost.crt',
  //   },
  // },
  plugins: [react()],

})
