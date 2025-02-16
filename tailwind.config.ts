import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: 'class', // Enable dark mode based on class
  content: [
    // ...existing content paths...
  ],
  theme: {
    extend: {
      colors: {
        theme: 'var(--theme-color)'
      }
      // ...existing theme extensions...
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
