import R from 'ramda'
import { createSelector } from 'reselect'
import themeSelector from './theme'
import themeVariablesSelector from './themeVariables'

export default createSelector(
  themeSelector,
  themeVariablesSelector,
  (theme, variables) => {
    const baseModule = require('themes/_base/index')
    const themeModule = theme ? require('themes/' + theme + '/index') : {}

    return R.merge(baseModule.styles(variables), themeModule.styles(variables))
  }
)
