/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
  theme: {
    extend: {
        colors: {
            lavender: {
                1: '#F5EFFF',
                2: '#E5D9F2',
                3: '#CDC1FF',
                4: '#A594F9',
                5: '#7B6EF6'
            }
        }
    },
  },
  plugins: [],
}

