import R from 'ramda'

// ------------------------------------
// Helpers
// ------------------------------------

// TODO: list is incomplete
const nonPrintableCharacters = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  19: 'pause/break',
  20: 'capslock',
  27: 'escape',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  37: 'leftarrow',
  38: 'uparrow',
  39: 'rightarrow',
  40: 'downarrow',
  45: 'insert',
  46: 'delete'
}

// *log :: String -> String
const log = (xyz) => { // eslint-disable-line no-unused-vars
  console.log(xyz)
  return xyz
}

// ------------------------------------
// Pure Functions
// ------------------------------------

// keyCodeProp :: Event -> KeyCode
const keyCodeProp = R.prop('keyCode')

// whichProp :: Event -> KeyCode
const whichProp = R.prop('which')

// keyCode :: Event -> KeyCode
const keyCode = R.either(whichProp, keyCodeProp)

// isNonPrintable :: Event -> Boolean
const isNonPrintable = R.compose(R.contains(R.__, R.keys(nonPrintableCharacters)), R.toString, keyCode)

// char :: Event -> Char
const char = R.curry(code => String.fromCharCode(code))

// hashPrefix :: String -> String
const hashPrefix = R.curry((str) => {
  return `#${str}`
})

// handlerFinder :: KeyCode -> ActionTypeValue -> ActionTypeKey -> Boolean
const handlerFinder = R.curry((code, val, key) => {
  const search = R.contains(R.__, R.split(',', val))
  return R.either(R.compose(search, hashPrefix), R.compose(search, char))(code)
})

// actionType :: [ActionType] -> Event -> ActionType
const actionType = R.curry((actionTypes) => {
  return R.compose(R.defaultTo(''), R.head, R.values,
      R.flip(R.pickBy)(actionTypes), handlerFinder, keyCode)
})

// character :: Event -> Char
const character = R.compose(char, keyCode)

export {
  keyCode,
  isNonPrintable,
  actionType,
  character
}
