/* eslint-disable no-unused-expressions */
import reducer from 'redux/modules/calculations'
import { actionTypes } from 'redux/modules'

describe('(Redux Module) calculations', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.deep.equal([])
    })

    it('should add the calculation on ADD_CALCULATION without error', () => {
      const newCalculation = {
        input: '6+16',
        output: 22
      }

      expect(reducer([], {
        type: actionTypes.ADD_CALCULATION,
        payload: newCalculation
      })).to.deep.equal([newCalculation])
    })

    it('should add the error on ADD_CALCULATION with error', () => {
      const payload = new TypeError('invalid input')

      const expected = {
        error: payload.toString()
      }

      expect(reducer([], {
        type: actionTypes.ADD_CALCULATION,
        payload,
        error: true
      })).to.deep.equal([expected])
    })
  })
})
