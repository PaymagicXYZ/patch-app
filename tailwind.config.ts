import plugin  from 'tailwindcss/plugin';
import type { Config } from 'tailwindcss'


const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        topToBottom: {
          '2.25%': { opacity: "0", transform: "translateY(-20px)" },
          '7.5%': { opacity: "1", transform: 'translateY(0)' },
          '26.25%': { opacity: "1", transform: "translateY(0)" },
          '33%': { opacity: "0", transform: 'translateY(30px)' },
        }
      },
      animation: {
        topToBottom: 'topToBottom 10s cubic-bezier(0.645, 0.045, 0.355, 1) infinite',
      }
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
}
export default config
