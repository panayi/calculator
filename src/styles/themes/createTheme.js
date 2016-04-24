import R from 'ramda'
import tinycolor from 'tinycolor2'
import base from './base'

export default R.compose(
  R.merge(base),
  (colors = {}) => ({ colors: {
    primary: colors.primaryColor,
    primaryDark: tinycolor(colors.primaryColor).saturate(3).darken(17)
      .toString(),
    accent: colors.accentColor,
    accent2: colors.accent2Color,
    primaryContrast: colors.primaryContrastColor,
    accentContrast: colors.accentContrastColor,
    canvas: colors.canvasColor,
    canvasDark: tinycolor(colors.canvasColor).darken(9).toString(),
    canvasDarker: tinycolor(colors.canvasColor).darken(18).desaturate(5)
      .setAlpha(0.7).toString(),
    text: colors.primaryColor,
    fadedText: tinycolor(colors.canvasColor).setAlpha(0.7).toString(),
    border: tinycolor(colors.primaryColor).setAlpha(0.35).toString(),
    lightBorder: tinycolor(colors.canvasColor).darken(3).toString(),
    logo: tinycolor(colors.primaryColor).desaturate(30).setAlpha(0.5).toString()
  } })
)
