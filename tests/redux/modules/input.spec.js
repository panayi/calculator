/* eslint-disable no-unused-expressions */
import reducer from 'redux/modules/input'
import { actionTypes } from 'redux/modules'

describe('(Redux Module) input', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.equal('')
    })

    it('should handle allowed PRINTABLE characters', () => {
      expect(reducer('9', {
        type: actionTypes.PRINTABLE,
        payload: '4'
      })).to.equal('94')
    })

    it('should handle BACKSPACE', () => {
      expect(reducer('1*3', {
        type: actionTypes.BACKSPACE
      })).to.equal('1*')
    })

    it('should empty the input on ADD_CALCULATION without error', () => {
      const state = '566*390'

      expect(reducer(state, {
        type: actionTypes.ADD_CALCULATION,
        payload: {
          input: state,
          output: 2
        }
      })).to.equal('')
    })

    it('should not change state on ADD_CALCULATION with error', () => {
      const state = '1+1'

      expect(reducer(state, {
        type: actionTypes.ADD_CALCULATION,
        payload: {
          input: state,
          output: 2
        },
        error: true
      })).to.equal(state)
    })
  })
})
