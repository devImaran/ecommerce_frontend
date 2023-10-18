/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'main-color':'#2dd4bf',
      'second-color':'#3AA39F',
      'white':'#fff',
      'indigo-600':'blue',
      'border-color':'#E4E4E4',
      'main-text':'#000',
      'second-text':'#1D364D',
      'off-white':'#EDF0F8',
      'light-text':'#B9BBBF',
      'yellow':'#E59819',
      'text-primary':'#344054',
      'text-secondary':'#667085'
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily:{
        Inter: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}