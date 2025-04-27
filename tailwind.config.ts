import { Config } from 'tailwindcss';

export default <Config>{
  theme: {
    extend: {
      colors: {
        blurple: '#5865F2',
        'blurple-dark': '#454FBF',
        'discord-dark': '#23272A',
      },
    },
  },
  plugins: [],
  content: [
    'components/**/*.{vue,js}',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'composables/**/*.{js,ts}',
    'plugins/**/*.{js,ts}',
  ],
  darkMode: 'class',
};
