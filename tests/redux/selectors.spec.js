import R from 'ramda'
import {
  currentCalculationSelector,
  keysSelector,
  previousCalculationsSelector,
  settingsSelector,
  themeSelector,
  themeStylesSelector,
  themeVariablesSelector
} from 'redux/selectors'
import { variables as baseVariables, styles as baseStyles } from 'themes/_base'
import { variables as darkVariables, styles as darkStyles } from 'themes/dark'

describe('(Redux Selector) ', function () {
  describe('calculations', function () {
    const first = {
      input: 'input1',
      output: 'output1'
    }
    const second = {
      input: 'input2',
      output: 'output2'
    }
    const third = {
      input: 'input3',
      output: 'output3'
    }
    const calculations = [first, second, third]

    it('should return the previous calculations', () => {
      expect(previousCalculationsSelector({ calculations }))
        .to.deep.equal([first, second])
    })

    it('should return the current calculation', () => {
      expect(currentCalculationSelector({ calculations }))
        .to.deep.equal(third)
    })
  })

  describe('keys', function () {
    it('should return the keys state', () => {
      const keys = 'a,b,c'

      expect(keysSelector({ keys })).to.deep.equal(keys)
    })
  })

  describe('settings', function () {
    it('should return the settings state', () => {
      const settings = {
        foo: 1,
        bar: 2
      }

      expect(settingsSelector({ settings })).to.deep.equal(settings)
    })
  })

  describe('theme', function () {
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
})
