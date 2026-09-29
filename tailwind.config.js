/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Natural, light-mode palette for clean Indian citizen-service product
        navy: {
          950: '#F8FAFC', // soft light page background
          900: '#FFFFFF', // pure white card surface
          850: '#F1F5F9', // light tinted containers
          800: '#E2E8F0', // subtle light gray border
          700: '#CBD5E1', // interactive border
          600: '#94A3B8',
        },
        brand: {
          purple: '#0F766E', // Trustworthy Deep Teal primary
          'purple-hover': '#0D645D',
          'purple-light': '#0D9488',
          cyan: '#0284C7', // Calm clear blue accent
          'cyan-hover': '#0369A1',
        },
        gov: {
          green: '#059669', // Emerald success
          orange: '#D97706', // Warm amber / saffron
          red: '#DC2626', // Soft red
          text: '#0F172A', // Deep charcoal headings & body text
          secondary: '#64748B', // Soft readable gray
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
