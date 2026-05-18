import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#030405',
        'ink-soft': '#080b0d',
        ice: '#6de8ff',
        bronze: '#b8905d',
        smoke: '#aab5ba'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Arial Narrow', 'Arial', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 42px rgba(109, 232, 255, 0.22)'
      }
    }
  },
  plugins: []
};

export default config;
