/* eslint-disable no-unused-expressions */
import reducer, { actionTypes as inputActionTypes } from 'redux/modules/input'
import { actionTypes as calculationsActionTypes } from 'redux/modules/calculations'

describe('(Redux Module) input', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.equal('')
    })

    it('should SET_INPUT', () => {
      const input = '402+30'

      expect(reducer('9', {
        type: inputActionTypes.SET_INPUT,
        payload: input
      })).to.equal(input)
    })

    it('should empty the input with error-free ADD_CALCULATION', () => {
      const state = '1+1'

      expect(reducer(state, {
        type: calculationsActionTypes.ADD_CALCULATION,
        payload: {
          input: state,
          output: 2
        }
      })).to.equal('')
    })

    it('should not change state with erroneous ADD_CALCULATION', () => {
      const state = '1+1'

      expect(reducer(state, {
        type: calculationsActionTypes.ADD_CALCULATION,
        payload: {
          input: state,
          output: 2
        },
        error: true
      })).to.equal(state)
    })
  })
})
