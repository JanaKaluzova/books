/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['DM Serif Display', 'Playfair Display', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        surface: {
          50: '#FAF7F2',
          100: '#F5F0E8',
          200: '#EDE7DD',
          300: '#E0D8CC',
          400: '#D4C9BA',
        },
        accent: {
          400: '#D4845A',
          500: '#C4704B',
          600: '#A45E3A',
        },
        gold: {
          400: '#D4A017',
          500: '#BF8F0A',
        },
        text: {
          primary: '#3D3329',
          secondary: '#9A8E80',
          muted: '#B5A99A',
        },
      },
      boxShadow: {
        'card': '0 2px 4px rgba(90,70,40,0.03), 0 8px 32px rgba(90,70,40,0.07)',
        'card-hover': '0 16px 48px rgba(90,70,40,0.15), 0 4px 12px rgba(90,70,40,0.06)',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(200%)' },
        },
        scan: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '100%' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        scan: 'scan 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
