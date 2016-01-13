import tinycolor from 'tinycolor2'

const primaryColor = '#005B82'
const accentColor = '#99173C'
const accent2Color = '#D57100'
const canvasColor = '#DADADA'
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
    canvasDarker: tinycolor(canvasColor).darken(18).desaturate(5).setAlpha(0.7)
                  .toString(),
    text: primaryColor,
    fadedText: tinycolor(canvasColor).setAlpha(0.7).toString(),
    border: tinycolor(primaryColor).setAlpha(0.35).toString(),
    lightBorder: tinycolor(canvasColor).darken(3).toString()
  }
}
