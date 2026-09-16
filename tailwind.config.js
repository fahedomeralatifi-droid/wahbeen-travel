/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040d1a',
          900: '#07162c',
          850: '#0a1f3d',
          800: '#0f2b54',
          700: '#173d75',
          600: '#235299',
          500: '#346cbd',
        },
        gold: {
          100: '#FDF7E7',
          200: '#FAECC4',
          300: '#F5DC98',
          400: '#EFCB6C',
          500: '#D4AF37',
          600: '#C5A059',
          700: '#A37F2C',
          800: '#755B20',
          900: '#4D3C15',
        },
        sand: {
          50: '#FAF8F5',
          100: '#F5F0E8',
          200: '#EBE2D3',
          300: '#DDD0BA',
        }
      },
      fontFamily: {
        luxury: ['"Cairo"', '"Alexandria"', '"El Messiri"', 'sans-serif'],
        heading: ['"Cairo"', '"Alexandria"', '"El Messiri"', '"Reem Kufi"', 'sans-serif'],
        kufi: ['"Reem Kufi"', '"El Messiri"', 'sans-serif'],
        amiri: ['"Amiri"', 'serif'],
        body: ['Tajawal', '"IBM Plex Sans Arabic"', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(212, 175, 55, 0.3)',
        'gold-glow-lg': '0 0 40px -5px rgba(212, 175, 55, 0.45)',
        'luxury': '0 20px 40px -15px rgba(4, 13, 26, 0.5)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F5DC98 0%, #D4AF37 50%, #A37F2C 100%)',
        'gold-gradient-soft': 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.05) 100%)',
        'navy-gradient': 'linear-gradient(180deg, #07162c 0%, #0a1f3d 100%)',
        'navy-radial': 'radial-gradient(ellipse at top, #0f2b54 0%, #07162c 60%, #040d1a 100%)',
      }
    },
  },
  plugins: [],
}
