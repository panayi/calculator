import tinycolor from 'tinycolor2'

const primaryColor = '#16a085'
const accentColor = '#FAAB22'
const accent2Color = '#EE213D'
const canvasColor = '#27313E'
const primaryContrastColor = 'white'
const accentContrastColor = 'white'

export default {
  colors: {
    primary: primaryColor,
    primaryDark: tinycolor(primaryColor).saturate(3).darken(17).toString(),
    accent: accentColor,
    accent2: accent2Color,
    primaryContrast: primaryContrastColor,
    accentContrast: accentContrastColor,
    canvas: canvasColor,
    canvasDark: tinycolor(canvasColor).darken(9).toString(),
    text: primaryColor,
    fadedText: tinycolor(accentColor).setAlpha(0.3).darken(5).toString(),
    border: tinycolor(primaryColor).setAlpha(0.35).toString(),
    lightBorder: tinycolor(canvasColor).darken(3).toString()
  },
  fontFamilies: {
    text: '\'Lato\', \'Helvetica\', \'Arial\', sans-serif',
    header: '\'Lobster\', sans-serif'
  },
  fontSizes: {
    base: '14px',
    large: '18px',
    small: '12px',
    xlarge: '22px'
  },
  gutters: {
    base: 20,
    small: 10,
    tiny: 3
  }
}
