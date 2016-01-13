/* eslint-disable no-unused-expressions */
import { keyPressed, actionTypes } from 'redux/modules/events'

describe('(Redux Module) events', function () {
  let event

  describe('actions', function () {
    beforeEach(function () {
      event = $.Event('keypress', {
        which: 100,
        keyCode: 100
      })
    })

    it('should create an action for handling keyPress event', function () {
      const expectedAction = {
        type: actionTypes.KEY_PRESSED,
        payload: event
      }
      expect(keyPressed(event)).to.deep.equal(expectedAction)
    })
  })
})
