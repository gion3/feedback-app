/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.jsx',
    './src/**/*.js',
  ],
  theme: {
    extend: {
      colors:{
        primary: '#4A90E2',
        secondary: '#50E3C2',
        accent: '#F5A623',
        background: '#F7F8FA',
        text: '#333333',
      }
    },
  },
  plugins: [],
}

