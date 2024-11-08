import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@rewind-ui/core/dist/theme/styles/Button.styles.js',
    './node_modules/@rewind-ui/core/dist/theme/styles/Text.styles.js',
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ["var(--font-sans)"],
  			mono: ["var(--font-mono)"],
				sansPro: ["var(--font-source-sans-pro)"],
				verdana: ["var(--font-verdana)"],
				segoe: ["var(--font-segoe)"],
				consolas: ["var(--font-consolas)"],
				menlo: ["var(--font-menlo)"],
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			darkGreen: {
  				'1': '#1D2A35',
					'2': '#0D1721',
					'3': '#15202B',
					'4': '#29353e',
					'5': '#193d3d',
  			},
  			green: {
  				'1': '#059862',
  				'2': '#D9EEE1',
					'3': '#96D4D4',
					'4': '#5AC05A',
					'5': '#88ccbb',
  			},
  			gray: {
  				'1': '#D8D9D9',
  				'2': '#DDDDDD',
  				'3': '#282A35',
					'4': '#43444a',
					'5': '#3E404A',
					'6': '#CCCCCC',
					'7': '#21232c',
					'8': '#F3ECEA',
					'9': '#575F6D',
					'10': '#424b5a',
					'11': '#dedede'
  			},
				black: {
					1: '#000000',
					2: '#38444D',
					3: "#171921",
					4: '#2D3748'
				},
				brown: {
					1: "#464646",
				},
				yellow: {
					1: '#fff4a3',
					2: '#FDD800'
				},
				pink: {
					1: "#FFB3BB",
					2: "#FFC0C7"
				},
				white: {
					1: '#E7E9EB',
					2: '#FFFFFF',
					3: '#f1f1f1',
					4: '#f9f9f952',
					5: '#ffffff47'
				},
				red: {
					1: '#ED594A',
					2: '#ff9999',
				},
				gradient: {
					green: 'rgba(4, 170, 109, 1)',
					brown: 'rgba(115,112,89,1)',
					purple: "rgba(151, 99, 246, 1)"
				},

  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		screens: {
  			ms: '375px',
  			xs: '400px',
				lxs: '425px',
				slxs: '440px',
  			sm: '475px',
				slt: '503px',
				nlts: '530px',
  			lt: '603px',
  			xlt: '617px',
  			smd: '689px',
				nmd: '701px',
  			md: '768px',
				lmd: '817px',
  			mmd: '829px',
  			xmd: '887px',
  			xslp: '955px',
  			slp: '993px',
  			llp: '1075px',
  			lp: '1024px',
				nlp: '1107px',
  			mlp: '1188px',
				nmlp: '1190px',
  			xlp: '1214px',
  			xslg: '',
  			slg: '1227px',
  			llg: '',
  			lg: '1300px',
  			mlg: '1339px',
  			xlg: '',
  			xl: '1440px',
  			'2xl': '1990px'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	},
  	container: {
  		'menu-container': {
  			center: 'true',
				width: '100%',
  			padding: {
  				DEFAULT: '1rem',
  				sm: '2rem',
  				lg: '4rem',
  				xl: '5rem',
  				'2xl': '6rem'
  			},
  			screens: {
  				ms: '375px',
  				xs: '400px',
					lxs: '425px',
					slxs: '440px',
  				sm: '475px',
					slt: '503px',
					nlts: '530px',
  				lt: '603px',
  				xlt: '617px',
  				smd: '689px',
  				lmd: '817px',
  				md: '768px',
  				mmd: '829px',
  				xmd: '887px',
  				xslp: '955px',
  				slp: '993px',
  				llp: '1075px',
  				lp: '1024px',
  				mlp: '1188px',
  				xlp: '1214px',
  				xslg: '',
  				slg: '',
  				llg: '',
  				lg: '1300px',
  				mlg: '1339px',
  				xlg: '',
  				xl: '1440px',
  				'2xl': '1990px'
  			}
  		}
  	}
  },
  darkMode: ["class", 'class'],
  plugins: [
		nextui(), 
		require("tailwindcss-animate"),
		require('tailwind-scrollbar')({ nocompatible: true }),
    require('@tailwindcss/forms')({
      strategy: 'class' // only generate classes
    })
	],
}
