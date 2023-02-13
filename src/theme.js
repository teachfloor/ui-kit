import React from 'react'
import PropTypes from 'prop-types'
import {
  MantineProvider,
  useMantineTheme,
  createEmotionCache,
} from './core'
import { NotificationsProvider } from './notifications'
import { ModalsProvider } from './modals'
import { SpotlightProvider } from './spotlight'

const emotionCache = createEmotionCache({ key: 'teachfloor' })

/**
 * https://mantine.dev/theming/theme-object/
 */
export const theme = {
  /**
   * Defines color scheme for all components, defaults to "light"
   */
  colorScheme: 'light',

  /**
   * Controls focus ring styles:
   * - auto: display focus ring only when user navigates with keyboard (default)
   * - always: display focus ring when user navigates with keyboard and mouse
   * - never: focus ring is always hidden (not recommended)
   */
  focusRing: 'auto',

  /**
   * Change focus ring styles
   */
  focusRingStyles: {

    /**
     * reset styles are applied to <button /> and <a /> elements
     * in &:focus:not(:focus-visible) selector to mimic
     * default browser behavior for native <button /> and <a /> elements
     */
    // resetStyles: () => ({ outline: 'none' }),

    /**
     * styles applied to all elements expect inputs based on Input component
     * styled are added with &:focus selector
     */
    // styles: (theme) => ({ outline: `2px solid ${theme.colors.orange[5]}` }),

    /**
     * focus styles applied to components that are based on Input
     * styled are added with &:focus selector
     */
    // inputStyles: (theme) => ({ outline: `2px solid ${theme.colors.orange[5]}` }),
  },

  /**
   * Determines whether motion based animations should be disabled for
   * users who prefer to reduce motion in their OS settings
   */
  respectReducedMotion: true,

  /**
   * Determines whether elements that do not have pointer cursor by default
   * (checkboxes, radio, native select) should have it
   */
  cursorType: 'default',

  /**
   * Default border-radius used for most elements
   * Possible values:
   * 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
   */
  defaultRadius: 6,

  /**
   * White and black colors, defaults to '#fff' and '#000'
   */
  white: '#FFF',
  black: '#333',

  /**
   * Object of arrays with 10 colors
   */
  colors: {
    brand: [
      "#C5DBFF",
      "#9CC2FF",
      "#76ABFF",
      "#5496FF",
      "#3683FF",
      "#1A72FF",
      "#0062FF",
      "#0058E6",
      "#004FCF",
      "#0047BA"
    ],
  },

  /**
   * Key of theme.colors
   */
  primaryColor: 'brand',

  /**
   * Index of color from theme.colors that is considered primary, Shade type is 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
   * Possible values:
   * Shade | { light: Shade; dark: Shade }
   */
  primaryShade: {
    light: 6,
    dark: 6
  },

  /**
   * Default gradient used in components that support `variant="gradient"` (Button, ThemeIcon, etc.)
   */
  // defaultGradient: {
  //   from: 'orange',
  //   to: 'red',
  //   deg: 45,
  // },

  /**
   * font-family and line-height used in most components
   */
  // fontFamily: '',
  // lineHeight: '',

  /**
   * Timing function used for animations, defaults to 'ease'
   */
  // transitionTimingFunction: 'ease',

  /**
   * Monospace font-family, used in Code, Kbd and Prism components
   */
  // fontFamilyMonospace: '',

  /**
   * Sizes for corresponding properties
   * Possible values:
   * Record < 'xs' | 'sm' | 'md' | 'lg' | 'xl', number>
   */
  // fontSizes: {
  //   xs: 10,
  //   sm: 12,
  //   md: 14,
  //   lg: 16,
  //   xl: 20,
  // },
  // radius: '',
  // spacing: '',

  /**
   * Values used for box-shadow
   */
  // shadows: Record < 'xs' | 'sm' | 'md' | 'lg' | 'xl', string>,

  /**
   * Breakpoints used in some components to add responsive styles
   */
  // breakpoints: Record < 'xs' | 'sm' | 'md' | 'lg' | 'xl', number>,

  /**
   * Styles added to buttons with `:active` pseudo-class
   */
  // activeStyles: CSSObject,

  /**
   * h1-h6 styles, used in Title and TypographyStylesProvider components
   */
  // headings: {
  //   fontFamily: CSSProperties['fontFamily'],
  //   fontWeight: CSSProperties['fontWeight'],
  //   sizes: {
  //     // See heading options below
  //     h1: Heading,
  //     h2: Heading,
  //     h3: Heading,
  //     h4: Heading,
  //     h5: Heading,
  //     h6: Heading,
  //   },
  // },

  /**
   * theme functions, see in theme functions guide
   */
  // fn: MantineThemeFunctions,

  /**
   * Left to right or right to left direction, see RTL Support guide to learn more
   */
  // dir: 'ltr' | 'rtl'

  /**
   * Default loader used in Loader and LoadingOverlay components
   */
  // loader: 'oval' | 'bars' | 'dots',

  /**
   * Default date format used in DatePicker and DateRangePicker components
   */
  // dateFormat: string,

  /**
   * Default dates formatting locale used in every @mantine/dates component
   */
  // datesLocale: string,

  /**
   * defaultProps, styles and classNames for components
   */
  // components: ComponentsOverride,

  /**
   * Global styles
   */
  // globalStyles: (theme: MantineTheme) => CSSObject,

  /**
   * Add your own custom properties on Mantine theme
   */
  // other: Record < string, any>,
}

/**
 * Equivalent of calling the useMantineTheme hook
 *
 * https://mantine.dev/theming/theme-object/#use-mantine-theme-hook
 */
export const useTeachfloorTheme = useMantineTheme

/**
 * Teachfloor wrapper around Mantine providers.
 * Applies Teachfloor brand theme style.
 *
 * Use `TeachfloorProvider` to wrap your entire application to apply the brand theme.
 */
export const TeachfloorProvider = ({
  children,
  mantineProps = {},
  notificationsProps = {},
  modalsProps = {},
  spotlightProps = {},
}) => (
  <MantineProvider
    theme={theme}
    emotionCache={emotionCache}
    withGlobalStyles
    withNormalizeCSS
    {...mantineProps}
  >
    {/* <NotificationsProvider {...notificationsProps}> */}
      {/* <ModalsProvider {...modalsProps}> */}
        {/* <SpotlightProvider actions={[]} {...spotlightProps}> */}
          {children}
        {/* </SpotlightProvider> */}
      {/* </ModalsProvider> */}
    {/* </NotificationsProvider> */}
  </MantineProvider>
)

TeachfloorProvider.propTypes = {
  children: PropTypes.node,
  mantineProps: PropTypes.object,
  notificationsProps: PropTypes.object,
  modalsProps: PropTypes.object,
  spotlightProps: PropTypes.object,
}

TeachfloorProvider.defaultProps = {
  mantineProps: {
    theme
  },
}