import R from 'ramda'
import tinycolor from 'tinycolor2'
import base from './base'

const primaryColor = '#0A6987'
const accentColor = '#DA1415'
const accent2Color = '#363B40'
const canvasColor = '#DADADA'
const primaryContrastColor = 'white'
const accentContrastColor = 'white'

export default R.merge(base, {
  colors: {
    primary: primaryColor,
    primaryDark: tinycolor(primaryColor).saturate(3).darken(17).toString(),
    accent: accentColor,
    accent2: accent2Color,
    primaryContrast: primaryContrastColor,
    accentContrast: accentContrastColor,
    canvas: canvasColor,
    canvasDark: tinycolor(canvasColor).darken(9).toString(),
    canvasDarker: tinycolor(canvasColor).darken(18).desaturate(5).setAlpha(0.7)
                  .toString(),
    text: primaryColor,
    fadedText: tinycolor(canvasColor).setAlpha(0.7).toString(),
    border: tinycolor(primaryColor).setAlpha(0.35).toString(),
    lightBorder: tinycolor(canvasColor).darken(3).toString(),
    logo: tinycolor(primaryColor).desaturate(30).setAlpha(0.5).toString()
  }
})
