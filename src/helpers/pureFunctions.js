import R from 'ramda'

// ------------------------------------
// General
// ------------------------------------

// *log :: String -> String
// const log = (xyz) => {
//   console.log(xyz)
//   return xyz
// }

// invokeLater :: Number -> Number -> Function -> Function
const invokeLater = (arity, delay, callback) => {
  const invoker = function () {
    return window.setTimeout(() => {
      callback.apply(null, Array.prototype.slice.call(arguments))
    }, delay)
  }
  return arity > 0 ? R.curryN(arity, invoker) : invoker()
}

// mapIndexed :: Function -> List -> List
const mapIndexed = R.addIndex(R.map)

// propsChanged :: String[] -> Object -> Object -> Boolean
const propsChanged = (propsArray, props, nextProps) => {
  return R.useWith(R.compose(R.not, R.equals), [
    R.pick(propsArray),
    R.pick(propsArray)
  ])(props, nextProps)
}

// ------------------------------------
// Redux
// ------------------------------------

// dispatch -> Action -> Store -> ?
const dispatch = R.useWith(R.flip(R.call), [
  R.identity,
  R.prop('dispatch')
])

// isActionOfType -> ActionType -> Action -> Boolean
const isActionOfType = R.useWith(R.equals, [
  R.identity,
  R.prop('type')
])

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
  mapIndexed,
  propsChanged,
  state,
  invokeLater
}
