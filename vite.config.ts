import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // WICHTIG: Wenn dein Repo "mein-portfolio" heißt, muss base auf '/mein-portfolio/' gesetzt werden.
  // Wenn du eine Custom Domain nutzt (z.B. www.michael-foertsch.de), setze base auf '/'
  base: './', 
})