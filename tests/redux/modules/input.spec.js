/* eslint-disable no-unused-expressions */
import reducer, { actionTypes } from 'redux/modules/input'

describe('(Redux Module) input', () => {
  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).to.equal('')
    })

    it('should handle DIGITS', () => {
      expect(reducer('', {
        type: actionTypes.DIGITS,
        payload: '0'
      })).to.equal('0')
    })

    it('should handle OPERATIONS', () => {
      expect(reducer('', {
        type: actionTypes.OPERATIONS,
        payload: '+'
      })).to.equal('+')
    })

    it('should handle SPACE', () => {
      expect(reducer('', {
        type: actionTypes.SPACE,
        payload: ' '
      })).to.equal(' ')
    })

    it('should handle BACKSPACE', () => {
      expect(reducer('1', {
        type: actionTypes.BACKSPACE
      })).to.equal('')
    })

    it('should handle ENTER', () => {
      expect(reducer('  1 2 3   ', {
        type: actionTypes.ENTER
      })).to.equal('123')
    })
  })
})
