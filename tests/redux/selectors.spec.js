/* eslint-disable no-unused-expressions */
import R from 'ramda'
import {
  activeThemeNameSelector,
  allCalculationsSelector,
  currentCalculationSelector,
  keysSelector,
  nextThemeNameSelector,
  previousCalculationsSelector,
  settingsSelector,
  themeName,
  themesSelector,
} from 'redux/selectors'

describe('(Redux Selectors)', function () {
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

    it('it should return all calculations', function () {
      expect(allCalculationsSelector({ calculations }))
        .to.deep.equal(calculations)
    })

    it('should return the previous calculations in reverse order', function () {
      expect(previousCalculationsSelector({ calculations }))
        .to.deep.equal([second, first])
    })

    it('should return the current calculation', function () {
      expect(currentCalculationSelector({ calculations }))
        .to.deep.equal(third)
    })
  })

  describe('keys', function () {
    it('should return the keys state', function () {
      const keys = 'a,b,c'
      expect(keysSelector({ keys })).to.deep.equal(keys)
    })
  })

  describe('settings', function () {
    it('should return the settings state', function () {
      const settings = {
        foo: 1,
        bar: 2
      }
      expect(settingsSelector({ settings })).to.deep.equal(settings)
    })
  })

  describe('theme', function () {
    let darkTheme
    let lightTheme
    let themes

    beforeEach(function () {
      darkTheme = { name: 'dark', active: false }
      lightTheme = { name: 'light', active: false }
    })

    it('should return the "themes" state', function () {
      themes = [darkTheme, lightTheme]
      expect(themesSelector({ themes })).to.deep.equal(themes)
    })

    it('should return the "name" of the passed theme', function () {
      expect(themeName(lightTheme)).to.equal('light')
    })

    it('should return "undefined" when passed "undefined"', function () {
      expect(themeName(undefined)).to.be.undefined
    })

    it('should return the activated theme', function () {
      themes = [
        R.merge(darkTheme, { active: true }),
        lightTheme
      ]
      expect(activeThemeNameSelector({ themes })).to.deep.equal('dark')
    })

    it('should return the next theme', function () {
      themes = [
        darkTheme,
        R.merge(lightTheme, { active: true }),
      ]
      expect(nextThemeNameSelector({ themes })).to.deep.equal('dark')
    })
  })
})
