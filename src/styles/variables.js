import R from 'ramda'
import baseThemeVariables from './themes/base'
import baseLayoutVariables from './layout/base'

export default function (themeName) {
  const themeVariables = themeName
    ? require('styles/themes/' + themeName).default
    : {}

  return R.mergeAll([
    baseLayoutVariables,
    baseThemeVariables,
    themeVariables
  ])
}
