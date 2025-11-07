import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: '#DC2626',
  			buttonHoverColor: '#991B1B',
  			secondary: '#1F2937',
  			iconColor: '#DC2626',
  			hoverColor: '#991B1B',
  			white: '#FFFFFF',
  			black: '#000000',
  			red: '#DC2626',
  			background: {
  				light: '#ffffff',
  				dark: '#000000'
  			},
  			text: {
  				light: '#ffffff',
  				dark: '#000000'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		spacing: {},
  		screens: {
  			xs: '475px',
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1536px'
  		},
  		fontFamily: {
  			inter: [
  				'Inter',
  				'sans-serif'
  			],
  			circular: [
  				'Flow Circular',
  				'sans-serif'
  			],
  			epilogue: [
  				'Epilogue',
  				'Segoe UI',
  				'Helvetica Neue',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		backgroundImage: {
  			'gradient-left-right': 'linear-gradient(to top, #a16207, #FF6600)',
  			'gradient-left-right-alt': 'linear-gradient(to bottom, #b91c1c, #FF6600)',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
