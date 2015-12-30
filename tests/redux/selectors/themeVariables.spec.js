import R from 'ramda'
import themeVariables from 'redux/selectors/themeVariables'
import baseThemeVariables from 'themes/_base/variables'
import darkThemeVariables from 'themes/dark/variables'

describe('(Redux Selector) themeVariables', () => {
  it('should merge theme variables with _base variables', () => {
    const theme = 'dark'
    const variables = R.merge(baseThemeVariables, darkThemeVariables)

    expect(themeVariables({ theme })).to.deep.equal(variables)
  })

  it('should return _base variables when state.theme is empty', () => {

    expect(themeVariables({})).to.deep.equal(baseThemeVariables)
  })
})
