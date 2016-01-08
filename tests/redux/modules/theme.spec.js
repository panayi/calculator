/* eslint-disable no-unused-expressions */
import reducer, { actionTypes } from 'redux/modules/theme'

describe('(Redux Module) theme', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.equal('')
    })

    it('should handle SET_THEME', () => {
      const initialState = 'foo'
      const theme = 'bar'

      expect(reducer(initialState, {
        type: actionTypes.SET_THEME,
        payload: theme
      })).to.equal(theme)
    })
  })
})
