/* eslint-disable no-unused-expressions */
import R from 'ramda'
import reducer, { actionTypes } from 'redux/modules/settings'

describe('(Redux Module) settings', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.deep.equal({})
    })

    it('should handle SET_SETTING', () => {
      const initialState = { initialKey: 'foo' }
      const setting = { bar: 'baz' }

      expect(reducer(initialState, {
        type: actionTypes.SET_SETTING,
        payload: setting
      })).to.deep.equal(R.merge(initialState, setting))
    })
  })
})
