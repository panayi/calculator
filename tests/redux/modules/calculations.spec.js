/* eslint-disable no-unused-expressions */
import reducer, { actionTypes, updateCalculation }
  from 'redux/modules/calculations'
import { actionTypes as eventsActionTypes } from 'redux/modules/events'
import createCalculation from '../../test-helpers/createCalculation'

describe('(Redux Module) calculations', function () {
  describe('reducer', function () {
    it('should return the initial state', function () {
      expect(reducer(undefined, {})).to.deep.equal([{}])
    })

    describe('DELETE_CALCULATION', function () {
      it('should remove calculation at the provided index', function () {
        const calculations = [
          createCalculation('1+1', 2),
          createCalculation('1+2', 3),
          createCalculation('1+3', 4)
        ]

        expect(reducer(calculations, {
          type: actionTypes.DELETE_CALCULATION,
          payload: 1
        })).to.deep.equal([calculations[0], calculations[2]])
      })
    })

    describe('DONE_CALCULATION', function () {
      it('should append an empty calculation when is valid', function () {
        const calculation = createCalculation('6+16', 22)
        expect(reducer([calculation], {
          type: actionTypes.DONE_CALCULATION
        })).to.deep.equal([calculation, {}])
      })

      it('should not append an empty calculation when isError', function () {
        const calculation = createCalculation('6+', null, true)
        expect(reducer([calculation], {
          type: actionTypes.DONE_CALCULATION
        })).to.deep.equal([calculation])
      })

      it('should not append an empty calculation when input is undefined',
        function () {
          const calculation = createCalculation()
          expect(reducer([calculation], {
            type: actionTypes.DONE_CALCULATION
          })).to.deep.equal([calculation])
        }
      )

      it('should not append an empty calculation when input is empty',
        function () {
          const calculation = createCalculation('  ', '')
          expect(reducer([calculation], {
            type: actionTypes.DONE_CALCULATION
          })).to.deep.equal([calculation])
        }
      )
    })

    describe('UPDATE_CALCULATION', function () {
      it('should update the input, output and set isError=false when is valid',
        function () {
          const calculation = createCalculation('6+1', '7')
          const input = '6+16'
          const action = updateCalculation(input)
          const newCalculation = createCalculation(input, 22)
          expect(reducer([calculation], action)).to.deep.equal([newCalculation])
        }
      )

      it('should update the input and error when is not valid',
        function () {
          const calculation = createCalculation('6+1', '7')
          const input = '6+1+'
          const action = updateCalculation(input)
          const newCalculation = createCalculation(input, undefined, true)
          expect(reducer([calculation], action)).to.deep.equal([newCalculation])
        }
      )
    })

    describe('KEY_CLICKED', function () {
      const input = '1'
      const character = '5'
      const keyCode = 53

      it('should add the character of the pressed key to the end of input',
        function () {
          const calculation = createCalculation(input, parseInt(input, 10))
          const newInput = `${calculation.input}${character}`
          const newCalculation = createCalculation(
            newInput,
            parseInt(newInput, 10)
          )
          expect(reducer([calculation, calculation], {
            type: eventsActionTypes.KEY_CLICKED,
            payload: { keyCode, display: character }
          })).to.deep.equal([calculation, newCalculation])
        }
      )
    })
  })
})
