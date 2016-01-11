import { createSelector } from 'reselect'
import R from 'ramda'

// ------------------------------------
// Selectors
// ------------------------------------
const allCalculationsSelector = R.prop('calculations')

export const previousCalculationsSelector = createSelector(
  allCalculationsSelector,
  R.compose(R.reverse, R.tail, R.reverse)
)
export const currentCalculationSelector = createSelector(
  allCalculationsSelector,
  R.compose(R.head, R.reverse)
)

export const keysSelector = R.prop('keys')

export const settingsSelector = R.prop('settings')

export const themeSelector = R.prop('theme')

export const themeVariablesSelector = createSelector(
  themeSelector,
  (theme) => {
    const baseModule = require('themes/_base/index')
    const baseVariables = baseModule.variables

    const themeModule = theme ? require('themes/' + theme + '/index') : {}
    const themeVariables = theme ? themeModule.variables : {}

    return R.merge(baseVariables, themeVariables)
  }
)

export const themeStylesSelector = createSelector(
  themeSelector,
  themeVariablesSelector,
  (theme, variables) => {
    const baseModule = require('themes/_base/index')
    const themeModule = theme ? require('themes/' + theme + '/index') : {}

    return R.merge(
      baseModule.styles(variables),
      themeModule.styles ? themeModule.styles(variables) : {}
    )
  }
)
