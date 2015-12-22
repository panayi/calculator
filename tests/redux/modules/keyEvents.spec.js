/* eslint-disable no-unused-expressions */
import { actions, actionTypes } from 'redux/modules/keyEvents'

describe('(Redux Module) keyEvents', () => {
  let event

  describe('actions', () => {
    beforeEach(() => {
      event = $.Event('keydown', {
        which: 100,
        keyCode: 100
      })
    })

    it('should create an action for handling keyDown event', () => {
      const expectedAction = {
        type: actionTypes.KEY_DOWN,
        payload: event
      }

      expect(actions.handleKeyDown(event)).to.deep.equal(expectedAction)
    })

    it('should create an action for handling keyPress event', () => {
      const expectedAction = {
        type: actionTypes.KEY_PRESS,
        payload: event
      }

      expect(actions.handleKeyPress(event)).to.deep.equal(expectedAction)
    })
  })
})
