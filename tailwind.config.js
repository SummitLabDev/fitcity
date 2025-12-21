import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Space Grotesk', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        fitcity: "#FFE303",
        night: '#05060a',
        charcoal: '#0f1118',
        graphite: '#1a1c23',
        ash: '#2a2d38',
        cloud: '#f5f5f2',
      },
      boxShadow: {
        glow: '0 25px 80px rgba(255, 227, 3, 0.15)',
        card: '0 20px 45px rgba(5, 6, 10, 0.45)',
      },
      backgroundImage: {
        'hero-noise': "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
