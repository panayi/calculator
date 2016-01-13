/* eslint-disable no-unused-expressions */
import R from 'ramda'
import reducer, { actionTypes } from 'redux/modules/keys'

describe('(Redux Module) keys', function () {
  describe('reducer', function () {
    let initialState
    let finalState
    const AKeyCode = 65

    beforeEach(function () {
      initialState = [{
        display: 'A',
        keyCode: AKeyCode
      }]
    })

    it('should return the initial state', function () {
      expect(reducer(undefined, {})).to.deep.equal([])
    })

    it('should handle SET_KEYS', function () {
      finalState = [{
        display: 'B',
        keyCode: 66
      }]

      expect(reducer(initialState, {
        type: actionTypes.SET_KEYS,
        payload: finalState
      })).to.deep.equal(finalState)
    })

    it('should handle ACTIVATE_KEY', function () {
      finalState = [{
        display: 'A',
        keyCode: AKeyCode,
        active: true
      }]

      expect(reducer(initialState, {
        type: actionTypes.ACTIVATE_KEY,
        payload: AKeyCode
      })).to.deep.equal(finalState)
    })

    it('should handle DEACTIVATE_KEY', function () {
      const activeLens = R.lensProp('active')
      finalState = R.map(R.set(activeLens, false), initialState)
      initialState = R.map(R.set(activeLens, true), initialState)

      expect(reducer(initialState, {
        type: actionTypes.DEACTIVATE_KEY,
        payload: AKeyCode
      })).to.deep.equal(finalState)
    })
  })
})
