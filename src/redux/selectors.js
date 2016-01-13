import { createSelector } from 'reselect'
import R from 'ramda'

// ------------------------------------
// Calculations
// ------------------------------------

// allCalculationsSelector :: State -> Calculations
export const allCalculationsSelector = R.prop('calculations')

// previousCalculationsSelector :: State -> Calculations
export const previousCalculationsSelector = createSelector(
  allCalculationsSelector,
  R.init
)

// currentCalculationSelector :: State -> Calculation
export const currentCalculationSelector = createSelector(
  allCalculationsSelector,
  R.last
)

// ------------------------------------
// Keys
// ------------------------------------

// keysSelector :: State -> Keys
export const keysSelector = R.prop('keys')

// ------------------------------------
// Settings
// ------------------------------------

// settingsSelector :: State -> Settings
export const settingsSelector = R.prop('settings')

// ------------------------------------
// Themes
// ------------------------------------

// themesSelector :: State -> Themes
export const themesSelector = R.prop('themes')

// themeName :: Theme -> String
export const themeName = R.compose(R.prop('name'), R.defaultTo({}))

// activeTheme :: Themes -> Theme
export const activeThemeSelector = R.find(R.propEq('active', true))

// activeThemeNameSelector :: State -> Theme
export const activeThemeNameSelector = createSelector(
  themesSelector,
  R.compose(themeName, R.find(R.propEq('active', true)))
)


// nextThemeNameSelector :: State -> Theme
export const nextThemeNameSelector = createSelector(
  activeThemeNameSelector,
  themesSelector,
  R.compose(
    themeName,
    R.converge(R.nth, [
      R.compose(R.inc, R.useWith(R.findIndex, [R.propEq('name'), R.identity])),
      R.compose(R.converge(R.concat, [R.identity, R.identity]), R.nthArg(1))
    ])
  )
)

// themeVariables :: String -> Object
const themeVariables = (_themeName) => {
  const baseModule = require('themes/_base/index')
  const baseVariables = baseModule.variables
  const themeModule = _themeName
    ? require('themes/' + _themeName + '/index')
    : {}
  const variables = _themeName ? themeModule.variables : {}
  return R.merge(baseVariables, variables)
}

// themeVariablesSelector :: State -> Object
export const themeVariablesSelector = createSelector(
  activeThemeNameSelector,
  themeVariables
)

// nextThemeVariablesSelector :: State -> Object
export const nextThemeVariablesSelector = createSelector(
  nextThemeNameSelector,
  themeVariables
)

// themeStyles :: String -> Object
const themeStyles = (_themeName) => {
  const variables = themeVariables(_themeName)
  const baseModule = require('themes/_base/index')
  const themeModule = _themeName
    ? require('themes/' + _themeName + '/index')
    : {}

  return R.merge(
    baseModule.styles(variables),
    themeModule.styles ? themeModule.styles(variables) : {}
  )
}

// themeStylesSelector :: State -> Object
export const themeStylesSelector = createSelector(
  activeThemeNameSelector,
  themeStyles
)
