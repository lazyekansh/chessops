module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        neonBlue: '#3b82f6',
        deepDark: '#050505',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(59, 130, 246, 0.5)',
      }
    },
  },
  plugins: [],
}
