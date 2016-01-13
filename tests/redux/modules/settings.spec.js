/* eslint-disable no-unused-expressions */
import R from 'ramda'
import reducer, { actionTypes } from 'redux/modules/settings'

describe('(Redux Module) settings', function () {
  describe('reducer', function () {
    it('should return the initial state', function () {
      expect(reducer(undefined, {})).to.deep.equal({})
    })

    it('should handle SET_SETTING', function () {
      const initialState = { initialKey: 'foo' }
      const setting = { bar: 'baz' }

      expect(reducer(initialState, {
        type: actionTypes.SET_SETTING,
        payload: setting
      })).to.deep.equal(R.merge(initialState, setting))
    })
  })
})
