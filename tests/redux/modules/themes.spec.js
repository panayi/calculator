/* eslint-disable no-unused-expressions */
import R from 'ramda'
import reducer, { actionTypes } from 'redux/modules/themes'

describe('(Redux Module) theme', function () {
  describe('reducer', function () {
    it('should return the initial state', function () {
      expect(reducer(undefined, {})).to.deep.equal([])
    })

    it('should handle SET_THEME', function () {
      const theme1 = { name: 'foo', active: false }
      const theme2 = { name: 'bar', active: false }
      const initialState = [R.merge(theme1, { active: true }), theme2]

      expect(reducer(initialState, {
        type: actionTypes.ACTIVATE_THEME,
        payload: theme2.name
      })).to.deep.equal([theme1, R.merge(theme2, { active: true })])
    })
  })
})
