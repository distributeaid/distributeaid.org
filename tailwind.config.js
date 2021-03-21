module.exports = {
  // Remove unused classes in prod to decrease the size of the CSS bundle
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'navy-900': '#051E5E',
        'navy-800': '#082B76',
        'navy-700': '#09328B',
        'navy-600': '#224BA4',
        'navy-500': '#4362A6',
        'navy-400': '#8B9FC8',
        'navy-300': '#C5CFE4',
        'navy-200': '#DEE5F4',
        'navy-100': '#EEF4FD',
        'navy-50': '#F8FAFE',
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
