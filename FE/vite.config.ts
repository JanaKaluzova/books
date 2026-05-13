import fs from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    https: {
      key: fs.readFileSync('./temp/server.key'),
      cert: fs.readFileSync('./temp/server.crt'),
    },
  },
  preview: {
    host: true,
    https: {
      key: fs.readFileSync('./temp/server.key'),
      cert: fs.readFileSync('./temp/server.crt'),
    },
    allowedHosts: ['azul-nas.local', '192.168.0.98', 'localhost'],
  },
})
