/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
  extend: {},
  },
  plugins: [
    require('daisyui'), // Pastikan untuk menyertakan DaisyUI di sini sebagai plugin
  ],
};
