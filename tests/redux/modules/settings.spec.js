/* eslint-disable no-unused-expressions */
import R from 'ramda'
import reducer, { actionTypes, initialState } from 'redux/modules/settings'

describe('(Redux Module) settings', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.deep.equal(initialState)
    })

    it('should handle SET_SETTING', () => {
      const newSetting = { foo: 'bar' }
      expect(reducer(initialState, {
        type: actionTypes.SET_SETTING,
        payload: newSetting
      })).to.deep.equal(R.merge(initialState, newSetting))
    })
  })
})
