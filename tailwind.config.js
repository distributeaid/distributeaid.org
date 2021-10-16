module.exports = {
  // Remove unused classes in prod to decrease the size of the CSS bundle
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // we can also use tailwind's other pallets, such as coolGray for text
        navy: {
          900: '#051E5E',
          800: '#082B76',
          700: '#09328B',
          600: '#224BA4',
          500: '#4362A6',
          400: '#8B9FC8',
          300: '#C5CFE4',
          200: '#DEE5F4',
          100: '#EEF4FD',
          50: '#F8FAFE',
        },

        purple: {
          700: '#8F97E5',
          600: '#9FA8FF',
          500: '#B6BCFF',
          400: '#CCD1FF',
          300: '#E3E5FF',
          200: '#EEF0FF',
        },

        rosemary: {
          700: '#A284B0',
          600: '#B493C4',
          500: '#C6ACD2',
          400: '#D7C6E0',
          300: '#E9DFEE',
          200: '#F2ECF5',
        },

        turquoise: {
          700: '#79D2E3',
          600: '#87E9FC',
          500: '#A8EFFD',
          400: '#C8F5FE',
          300: '#DEF9FE',
          200: '#E9FBFE',
        },

        beige: {
          700: '#E5DBCE',
          400: '#FFF3E5',
          300: '#FFF6EB',
          200: '#FFF9F1',
          100: '#FFFBF7',
          50: '#FFFDFA',
        },
      },
      minHeight: {
        'half-screen': '50vh',
        /**
         * Viewport height minus the header height
         */
        content: 'calc(100vh - 4rem)',
      },
      height: {
        /**
         * Height of the navigation at the top of the page
         */
        nav: '4rem',
        /**
         * Viewport height minus the header height
         */
        content: 'calc(100vh - 4rem)',
      },
      fontFamily: {
        // sans: ['Raleway', 'sans-serif'],
        sans: ['Lato', 'sans-serif'],
        serif: ['Karla', 'serif'],
        mono: ['Inconsolata', 'mono'],
        handwriting: ['Caveat', 'cursive'],
      },
      boxShadow: {
        sm: '0px 1px 2px 0px #000000 5%',
        DEFAULT:
          '0px 1px 2px 0px #000000 6%, box-shadow: 0px 1px 3px 0px #000000 10%',
        md: '0px 1px 2px 0px #000000 6%, box-shadow: 0px 1px 3px 0px #000000 10%',
        lg: '0px 4px 6px -2px #000000 5%, 0px 10px 15px -3px #000000 10%',
      },
    },
  },
  variants: {
    extend: {
      // Adds the ability to style the first and last child.
      // For example: first:pl-4
      padding: ['first', 'last'],
      // Adds the ability to set the background color on the active state
      // For example: active:bg-green-700
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
