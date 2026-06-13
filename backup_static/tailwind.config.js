/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"], // Ini penting! Agar tailwind membaca file HTML & JS Anda
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        'studio-black': '#0a0a0a',
        'studio-gray': '#1c1c1c',
        'studio-white': '#f5f5f5',
        'studio-gold': '#d4af37',
      },
      // Animasi Shimmer (Bonus dari diskusi sebelumnya)
      keyframes: {
        shimmer: {
            '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
            '100%': { transform: 'translateX(200%) skewX(-12deg)' },
        }
      }
    },
  },
  plugins: [],
}