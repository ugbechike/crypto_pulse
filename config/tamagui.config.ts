import { createAnimations } from '@tamagui/animations-react-native'
import { createTamagui, getConfig } from '@tamagui/core'

export const config = createTamagui({
  animations: createAnimations({
    bouncy: {
      type: 'spring',
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    lazy: {
      type: 'spring',
      damping: 20,
      stiffness: 60,
    },
    quick: {
      type: 'spring',
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    }
  }),
  defaultTheme: 'dark',
  // act like CSS variables at your root
  tokens: {
    // width="$sm"
    size: { sm: 8, md: 12, lg: 20 },
    // margin="$-sm"
    space: { '-sm': 8 },
    // radius="$none"
    radius: { none: 0, sm: 3, md: 6, lg: 12, xl: 24 },
    color: { 
      white: '#fff',
      black: '#000',
      background: '#121212',
      text: '#ffffff',
      tabDefaultText: '#9BA1A6',
      tabActiveText: '#ffffff',
      // emerald
      emerald: '#10B981',
      border: '#27272A',
      gray: '#64748B',
      subtitle: '#9BA1A6', // light gray
      shadow: '#000000',
      shadow2: '#121212',
      // secondary background that is used for bottom sheet
      secondaryBackground: '#1E2028',
      red: '#EF4444',
      skeleton: '#3A3D46',
      gray2: '#2A2D36',
      cardBackground: '#F9F9F9',
      textDarkGray: "#333333",
      gray4: "#F5F5F5",
      gray5: "#C5C5D0"
    },
  },

  themes: {
    light: {
      background: '#ffffff',
      text: '#000000',
    },
    dark: {
      background: '#121212',
      text: '#ffffff',
    },
  },

  // media query definitions can be used to style,
  // but also can be used with "groups" to do container queries by size:
  media: {
    sm: { maxWidth: 860 },
    gtSm: { minWidth: 860 + 1 },
    short: { maxHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },

  shorthands: {
    // <View px={20} />
    px: 'paddingHorizontal',
  },

  settings: {
    disableSSR: true, // for client-side apps gains a bit of performance
    allowedStyleValues: 'somewhat-strict-web', // if targeting only web
  },
})

// in other files use this:
// console.log(`config is`, getConfig())

// get typescript types on @tamagui/core imports:
type AppConfig = typeof config
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}