import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			keyframes: {
				"top-to-bottom": {
					"4%": { opacity: "0", transform: "translateY(-20px)" },
					"12%": { opacity: "1", transform: "translateY(0)" },
					"25.6875%": { opacity: "1", transform: "translateY(0)" },
					"31.75%": { opacity: "0", transform: "translateY(30px)" },
				},
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"top-to-bottom":
					"top-to-bottom 12.5s cubic-bezier(0.645, 0.045, 0.355, 1) infinite",
				"twitter-pulse": "pulse 2.25s infinite cubic-bezier(0.66, 0.33, 0, 1)",
			},
			colors: {
				orange: {
					100: "#FF7557",
					200: "#E66A4F",
					300: "#CE5F46",
					400: "#B5533E",
					500: "#9D4835",
					600: "#843D2D",
					700: "#6B3125",
					800: "#53261C",
					900: "#3A1B14",
					1000: "#210F0B",
				},
				green: {
					100: "#BFFF57",
					200: "#ADE64F",
					300: "#9ACE46",
					400: "#88B53E",
					500: "#759D35",
					600: "#63842D",
					700: "#506B25",
					800: "#3E531C",
					900: "#2B3A14",
					1000: "#19210B",
				},
				gray: {
					50: "#EBEDF0",
					100: "#E1E3E6",
					200: "#C4C8CC",
					300: "#AAAEB3",
					400: "#909499",
					500: "#76787A",
					600: "#5D5F61",
					700: "#454647",
					800: "#2C2D2E",
					850: "#222225",
					900: "#18181B",
					950: "#131315",
					1000: "#0A0A0A",
				},
				twitter: {
					100: "#1DA1F2",
				},
				github: {
					100: "#28A745",
				},
				farcaster: {
					100: "#8E34D5",
				},
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
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
				},
			);
		}),
	],
} satisfies Config;

export default config;
