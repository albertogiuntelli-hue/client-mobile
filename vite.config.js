import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
        cleanupOutdatedCaches: true,
        skipWaiting: true,      // 🔥 forza aggiornamento immediato
        clientsClaim: true      // 🔥 prende controllo subito
      },

      includeAssets: [
        "favicon.ico",
        "icon-192.png",
        "icon-512.png"
      ],

      manifest: {
        name: "PlusMarket Giuntelli",
        short_name: "PlusMarket",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },

      devOptions: {
        enabled: false
      }
    })
  ]
});
