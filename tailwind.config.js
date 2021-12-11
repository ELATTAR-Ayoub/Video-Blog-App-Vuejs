module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          DEFAULT: '#FFF',
          light: '#F1F6FC',
        },
        secondary: {
          DEFAULT: '#151515',
          light: '#1e1e1e',
          dark: '#000',
        },
        sideColor: {
          DEFAULT: '#2659E8',
          light: '#D1A7FD',
          dark: '#0A36AF',
        },
      },
      spacing: {
        mini: '10%',
        "semi-mini": '15%',
        small: '25%',
        medium: '50%',
        big: '75%',
        "semi-big": '85%',
        doubleFull: '200%',
      },
      width: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '10%': '10%',
        '7%': '7%',
      },
      height: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '10%': '10%',
        '5%': '5%',
        '90vh': '90vh',
        '80vh': '80vh',
        '10vh': '10vh',
      },
      minWidth: {
        '0': '0',
        'md': '768px',
      },
      maxWidth: {
        '0': '0',
        'md': '768px',
      },
      minHeight: {
        '0': '0',
        '20rem': '20rem',
      },
      maxHeight: {
        '0': '0',
        '20rem': '20rem',
      },
      fontFamily: {
        primary: 'Open Sans, sans-serif',
        secondary: '',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'group-focus'],
      content: ['group-focus'],
    },
  },
  plugins: [],
}
