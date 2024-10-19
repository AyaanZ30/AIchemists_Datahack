export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          customBlack: '#000000a8',
          customBlueGray: '#213547',
        },
        backgroundImage: {
          'questx-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
        },
      },
    },
    plugins: [],
  }