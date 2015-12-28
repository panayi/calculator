import R from 'ramda'
import { createSelector } from 'reselect'
import themeSelector from './theme'

export default createSelector(
  themeSelector,
  (theme) => {
    const baseModule = require('themes/_base/index')
    const baseVariables = baseModule.variables

    const themeModule = theme ? require('themes/' + theme + '/index') : {}
    const themeVariables = theme ? themeModule.variables : {}

    return R.merge(baseVariables, themeVariables)
  }
)
