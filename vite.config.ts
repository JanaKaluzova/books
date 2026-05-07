import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), basicSsl()],
  preview: {
    allowedHosts: ['azul-nas.local', '192.168.0.98', 'localhost'],
  },
})
