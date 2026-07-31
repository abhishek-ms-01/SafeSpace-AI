import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  darkMode: 'class',

  theme: {
    extend: {
      /* ── Colors (Phase 0 complete palette) ── */
      colors: {
        primary: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        success: {
          50:  '#F0FDF4',
          100: '#DCFCE7',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
        },
        warning: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          400: '#FBBF24',
          500: '#EABB08',
          600: '#D97706',
          700: '#B45309',
        },
        danger: {
          50:  '#FFF5F5',
          100: '#FEE2E2',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
        },
        /* Dark mode surface shades */
        dark: {
          900: '#0D1117',
          850: '#0f172a',
          800: '#111827',
          750: '#161e2c',
          700: '#1F2937',
          600: '#374151',
          500: '#4B5563',
        },
      },

      /* ── Typography ── */
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1rem' }],
        'sm':   ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem',     { lineHeight: '1.6rem' }],
        'lg':   ['1.125rem', { lineHeight: '1.75rem' }],
        'xl':   ['1.25rem',  { lineHeight: '1.85rem' }],
        '2xl':  ['1.5rem',   { lineHeight: '2rem' }],
        '3xl':  ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl':  ['2.25rem',  { lineHeight: '2.75rem' }],
        '5xl':  ['3rem',     { lineHeight: '3.5rem' }],
      },

      /* ── Spacing extras ── */
      spacing: {
        '4.5': '1.125rem',
        '13':  '3.25rem',
        '18':  '4.5rem',
        '88':  '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      /* ── Border radius ── */
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },

      /* ── Shadows ── */
      boxShadow: {
        'sm':     '0 1px 2px 0 rgba(0,0,0,0.05)',
        DEFAULT:  '0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'md':     '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.04)',
        'lg':     '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04)',
        'xl':     '0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04)',
        '2xl':    '0 25px 50px -12px rgba(0,0,0,0.15)',
        'focus':  '0 0 0 3px rgba(59,130,246,0.25)',
        'danger': '0 0 0 3px rgba(239,68,68,0.25)',
        'glow':   '0 0 20px rgba(59,130,246,0.35)',
        'card':   '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.04)',
      },

      /* ── Min/Max heights ── */
      minHeight: {
        'input': '120px',
        'chat':  '400px',
        'screen-75': '75vh',
      },
      maxHeight: {
        'input':  '300px',
        'report': '500px',
        'chat':   '520px',
      },

      /* ── Custom animations ── */
      animation: {
        'fade-in-up':    'fadeInUp 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':       'fadeIn 0.25s ease-out both',
        'slide-right':   'slideInRight 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'slide-left':    'slideInLeft 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'slide-up':      'slideUp 0.3s cubic-bezier(0.16,1,0.3,1) both',
        'scale-in':      'scaleIn 0.25s cubic-bezier(0.16,1,0.3,1) both',
        'pulse-subtle':  'pulseSubtle 2s ease-in-out infinite',
        'glow':          'glow 2s ease-in-out infinite',
        'glow-danger':   'glowDanger 1.5s ease-in-out infinite',
        'shimmer':       'shimmer 1.5s ease-in-out infinite',
        'spin-slow':     'spin 1.2s linear infinite',
        'bounce-y':      'bounceY 0.6s ease-in-out infinite',
        'progress-fill': 'progressFill 0.8s ease-out 0.2s both',
      },

      /* ── Custom keyframes ── */
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-24px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.65' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(59,130,246,0.45)' },
          '50%':       { boxShadow: '0 0 0 8px rgba(59,130,246,0)' },
        },
        glowDanger: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(239,68,68,0.45)' },
          '50%':       { boxShadow: '0 0 0 8px rgba(239,68,68,0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-800px 0' },
          '100%': { backgroundPosition:  '800px 0' },
        },
        bounceY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-6px)' },
        },
        progressFill: {
          from: { width: '0%' },
          to:   { width: '100%' },
        },
      },

      /* ── Transitions ── */
      transitionTimingFunction: {
        'out-expo':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-expo':   'cubic-bezier(0.7, 0, 0.84, 0)',
        'spring':    'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '50':  '50ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
      },
    },
  },

  plugins: [
    require('@tailwindcss/forms'),
  ],
}

export default config
