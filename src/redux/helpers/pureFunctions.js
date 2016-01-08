import R from 'ramda'

// ------------------------------------
// Helpers
// ------------------------------------

// dispatch -> Action -> Store -> ?
const dispatch = R.useWith(R.flip(R.call), [
  R.identity,
  R.prop('dispatch')
])

// invokeLater :: Number -> Number -> Function -> Function
const invokeLater = (arity, delay, callback) => {
  const invoker = function () {
    return window.setTimeout(() => {
      callback.apply(null, Array.prototype.slice.call(arguments))
    }, delay)
  }
  return arity > 0 ? R.curryN(arity, invoker) : invoker()
}

// isActionOfType -> ActionType -> Action -> Boolean
const isActionOfType = R.useWith(R.equals, [
  R.identity,
  R.prop('type')
])


// *log :: String -> String
// const log = R.curry((debugMsg, xyz) => {
//   console.log(debugMsg + ': ', xyz)
//   return xyz
// })

// state -> Selector -> Store -> *
const state = R.useWith(R.call, [
  R.identity,
  R.invoker(0, 'getState')
])

// ------------------------------------
// Key
// ------------------------------------

// keyCodeProp :: Event -> KeyCode
const keyCodeProp = R.prop('keyCode')

// whichProp :: Event -> KeyCode
const whichProp = R.prop('which')

// keyCode :: Event -> KeyCode
const keyCode = R.either(whichProp, keyCodeProp)

// characterFromKeyCode :: KeyCode -> Char
const characterFromKeyCode = R.curry(code => String.fromCharCode(code))

// character :: Event -> Char
const character = R.compose(characterFromKeyCode, keyCode)

export {
  character,
  characterFromKeyCode,
  dispatch,
  isActionOfType,
  keyCode,
  state,
  invokeLater
}
