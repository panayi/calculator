import R from 'ramda'
import { themeSelector, themeVariablesSelector, themeStylesSelector } from 'redux/selectors'
import { variables as baseVariables, styles as baseStyles } from 'themes/_base'
import { variables as darkVariables, styles as darkStyles } from 'themes/dark'

describe('(Redux Selector) theme', function () {
  let theme
  let variables
  let styles

  beforeEach(function () {
    theme = 'dark'
    variables = R.merge(baseVariables, darkVariables)
    styles = R.merge(baseStyles(variables), darkStyles(variables))
  })

  it('should return the input state', function () {
    expect(themeSelector({ theme })).to.equal(theme)
  })

  it('should merge theme variables with _base variables', () => {
    expect(themeVariablesSelector({ theme })).to.deep.equal(variables)
  })

  it('should return _base variables when state.theme is empty', () => {
    expect(themeVariablesSelector({})).to.deep.equal(baseVariables)
  })

  it('should merge theme styles with _base styles', function () {
    expect(themeStylesSelector({ theme, variables })).to.deep.equal(styles)
  })

  it('should merge _base styles when state.theme is empty', function () {
    expect(themeStylesSelector({ variables })).to.deep.equal(baseStyles(variables))
  })
})
