// @ts-check

// const colors = require('tailwindcss/colors')

// helpers for @tailwindcss/typography styles
// see: https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
/** @type {(num: number) => string} */
const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')

/** @type {(px: number) => string} */
// const rem = (px) => `${round(px / 16)}rem`

/** @type {(px: number, base: number) => string} */
const em = (px, base) => `${round(px / base)}em`

/** @type {import('tailwindcss').Config} */
const config = {
  // Remove unused classes in prod to decrease the size of the CSS bundle
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        // we can also use tailwind's other palettes, such as coolGray for text
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

        'screen/2': '50vh',
      },
      fontFamily: {
        sans: [
          'Lato',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      boxShadow: {
        sm: '0px 1px 2px 0px #000000 5%',
        DEFAULT:
          '0px 1px 2px 0px #000000 6%, box-shadow: 0px 1px 3px 0px #000000 10%',
        md: '0px 1px 2px 0px #000000 6%, box-shadow: 0px 1px 3px 0px #000000 10%',
        lg: '0px 4px 6px -2px #000000 5%, 0px 10px 15px -3px #000000 10%',
      },

      // unfortunately @tailwindcss/typeography doesn't ship types
      /** @ts-ignore */
      typography: ({ theme }) => ({
        // docs: https://tailwindcss.com/docs/typography-plugin#customizing-the-css
        // code: https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
        DEFAULT: {
          css: {
            h1: {
              fontSize: em(54, 16),
              marginTop: '0',
              marginBottom: em(48, 54),
              lineHeight: round(67.5 / 54),
              textTransform: 'uppercase',
            },
            h2: {
              fontSize: em(24, 16),
              marginTop: em(48, 24),
              marginBottom: em(24, 24),
              lineHeight: round(32 / 24),
            },
            h3: {
              fontSize: em(20, 16),
              marginTop: em(32, 20),
              marginBottom: em(12, 20),
              lineHeight: round(32 / 20),
            },

            '--tw-prose-body': theme('colors.navy[700]'),
            '--tw-prose-headings': theme('colors.navy[700]'),
            '--tw-prose-lead': theme('colors.gray[600]'),
            '--tw-prose-links': theme('colors.navy[900]'),
            '--tw-prose-bold': theme('colors.navy[900]'),
            '--tw-prose-counters': theme('colors.gray[500]'),
            '--tw-prose-bullets': theme('colors.gray[300]'),
            '--tw-prose-hr': theme('colors.gray[200]'),
            '--tw-prose-quotes': theme('colors.gray[900]'),
            '--tw-prose-quote-borders': theme('colors.gray[200]'),
            '--tw-prose-captions': theme('colors.gray[500]'),
            '--tw-prose-code': theme('colors.gray[900]'),
            '--tw-prose-pre-code': theme('colors.gray[200]'),
            '--tw-prose-pre-bg': theme('colors.gray[800]'),
            '--tw-prose-th-borders': theme('colors.gray[300]'),
            '--tw-prose-td-borders': theme('colors.gray[200]'),
            '--tw-prose-invert-body': theme('colors.gray[300]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.gray[400]'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.gray[400]'),
            '--tw-prose-invert-bullets': theme('colors.gray[600]'),
            '--tw-prose-invert-hr': theme('colors.gray[700]'),
            '--tw-prose-invert-quotes': theme('colors.gray[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.gray[700]'),
            '--tw-prose-invert-captions': theme('colors.gray[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.gray[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.gray[600]'),
            '--tw-prose-invert-td-borders': theme('colors.gray[700]'),
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      // Adds the ability to style the first and last child.
      // For example: first:pl-4
      padding: ['first', 'last'],
      // Adds the ability to set the background color on the active state
      // For example: active:bg-green-700
      backgroundColor: ['active', 'even', 'odd'],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
}

module.exports = config
