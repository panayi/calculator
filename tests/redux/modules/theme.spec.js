/* eslint-disable no-unused-expressions */
import reducer, { actionTypes, initialState } from 'redux/modules/theme'

describe('(Redux Module) theme', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.equal(initialState)
    })

    it('should handle SET_THEME', () => {
      const theme = 'foo'
      expect(reducer(initialState, {
        type: actionTypes.SET_THEME,
        payload: theme
      })).to.equal(theme)
    })
  })
})
