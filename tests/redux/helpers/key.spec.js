import { isNonPrintable, actionType as _actionType, character } from 'redux/helpers/key'

describe('(Helper) Key', () => {
  let actionTypes
  let actionType
  let keyEvents

  beforeEach(function () {
    actionTypes = {
      LITERAL_CHARS: '!,@,#,$,%,^,&,*,(,)',
      KEYCODES: '#65,#66,#67', // a,b,c
    }

    actionType = _actionType(actionTypes)

    keyEvents = {
      $: { keyCode: 36, which: null },
      c: { keyCode: null, which: 67 },
      backspace: { keyCode: 8, which: 8 },
      tilde: { keyCode: null, which: 126 }
    }
  })

  it('should return character from keycode', () => {
    expect(character(keyEvents.tilde)).to.equal('~')
  })

  it('should detect control character', function () {
    expect(isNonPrintable(keyEvents.backspace)).to.equal(true)
  })

  it('should return the action type when using literal characters', () => {
    expect(actionType(keyEvents.$)).to.equal(actionTypes.LITERAL_CHARS)
  })

  it('should return the action type when using keycodes', () => {
    expect(actionType(keyEvents.c)).to.equal(actionTypes.KEYCODES)
  })
})
