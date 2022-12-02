import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  if (command === 'serve') {
    return {
      plugins: [react()],
      mode: 'development',
      base: '/'
    }
  } else {
    // command === 'build'
    return {
      plugins: [react()], 
      mode: 'production',
      build: {
        outDir: 'docs'
      },
      base: '/breaking-news-app/'
    }
  }
});


