import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Pokédex Aventura',
        short_name: 'Pokédex',
        description: 'Explora el mundo Pokémon',
        theme_color: '#ef5350',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'public/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'public/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})