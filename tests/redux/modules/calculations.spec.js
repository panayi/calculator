/* eslint-disable no-unused-expressions */
import reducer, { actionTypes, updateCalculation } from 'redux/modules/calculations'
import { actionTypes as eventsActionTypes } from 'redux/modules/events'

describe('(Redux Module) calculations', function () {
  describe('reducer', function () {
    it('should return the initial state', function () {
      expect(reducer(undefined, {})).to.deep.equal([{}])
    })

    describe('DELETE_CALCULATION', function () {
      it('should remove calculation at the provided index', function () {
        const calculations = [
          { input: '1+1', output: 2 },
          { input: '1+2', output: 3 },
          { input: '1+3', output: 4 }
        ]

        expect(reducer(calculations, {
          type: actionTypes.DELETE_CALCULATION,
          payload: 1
        })).to.deep.equal([calculations[0], calculations[2]])
      })
    })

    describe('DONE_CALCULATION', function () {
      it('should append an empty calculation when is valid', () => {
        const calculation = {
          input: '6+16',
          output: 22
        }

        expect(reducer([calculation], {
          type: actionTypes.DONE_CALCULATION
        })).to.deep.equal([calculation, {}])
      })

      it('should not append an empty calculation when "isError"', () => {
        const calculation = {
          input: '6+',
          isError: true
        }

        expect(reducer([calculation], {
          type: actionTypes.DONE_CALCULATION
        })).to.deep.equal([calculation])
      })

      it('should not append an empty calculation when "input" is empty', () => {
        const calculation = {
          input: '  ',
          output: ''
        }

        expect(reducer([calculation], {
          type: actionTypes.DONE_CALCULATION
        })).to.deep.equal([calculation])
      })
    })

    describe('UPDATE_CALCULATION', function () {
      it('should update the "input" and "output" when is valid', function () {
        const calculation = {
          input: '6+1',
          output: 7
        }
        const input = '6+16'
        const action = updateCalculation(input)
        const newCalculation = {
          input,
          output: 22
        }
        expect(reducer([calculation], action)).to.deep.equal([newCalculation])
      })

      it('should update the "input" and "error" when is not valid',
        function () {
          const calculation = {
            input: '6+1',
            output: 7
          }
          const input = '6+1+'
          const action = updateCalculation(input)
          const newCalculation = {
            input,
            isError: true
          }
          expect(reducer([calculation], action)).to.deep.equal([newCalculation])
        }
      )
    })

    describe('BUTTON_CLICKED', function () {
      const input = '1'
      const character = '5'
      const keyCode = 53

      it('should add the character of the pressed key to the end of input',
        function () {
          const calculation = {
            input,
            output: parseInt(input, 10)
          }
          const newInput = `${calculation.input}${character}`
          const newCalculation = {
            input: newInput,
            output: parseInt(newInput, 10)
          }

          expect(reducer([calculation, calculation], {
            type: eventsActionTypes.BUTTON_CLICKED,
            payload: { keyCode, display: character }
          })).to.deep.equal([calculation, newCalculation])
        }
      )
    })
  })
})
