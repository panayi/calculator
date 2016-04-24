import R from 'ramda'
import baseThemeVariables from './themes/base'
import baseLayoutVariables from './layout/base'
import createTheme from './themes/createTheme'

export default function (themeName) {
  const themeVariables = themeName
    ? createTheme(require('styles/themes/' + themeName).default)
    : {}

  return R.mergeAll([
    baseLayoutVariables,
    baseThemeVariables,
    themeVariables
  ])
}
