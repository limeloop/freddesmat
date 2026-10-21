import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      // Alla sidor byggs som statisk HTML – snabbt och sökmotorvänligt.
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // Ankarlänkar (#lunch, #offert …) är samma sida – hoppa över dem.
        filter: (page) => !page.path.includes('#'),
      },
    }),
    // Nitro paketerar serverfunktionen för offertformuläret (Vercel upptäcks automatiskt).
    nitro(),
    viteReact(),
  ],
})
