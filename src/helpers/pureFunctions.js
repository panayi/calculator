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
export const invokeLater = (arity, delay, callback) => {
  const invoker = function () {
    return window.setTimeout(() => {
      callback.apply(null, Array.prototype.slice.call(arguments))
    }, delay)
  }
  return arity > 0 ? R.curryN(arity, invoker) : invoker()
}

// mapIndexed :: Function -> List -> List
export const mapIndexed = R.addIndex(R.map)

// propsChanged :: String[] -> Object -> Object -> Boolean
export const propsChanged = (propsArray, props, nextProps) =>
  R.useWith(R.compose(R.not, R.equals), [
    R.pick(propsArray),
    R.pick(propsArray)
  ])(props, nextProps)

// ------------------------------------
// Redux
// ------------------------------------

// dispatch -> Action -> Store -> ?
export const dispatch = R.useWith(R.flip(R.call), [
  R.identity,
  R.prop('dispatch')
])

// isActionOfType -> ActionType -> Action -> Boolean
export const isActionOfType = R.useWith(R.equals, [
  R.identity,
  R.prop('type')
])

// state -> Selector -> Store -> *
export const state = R.useWith(R.call, [
  R.identity,
  R.invoker(0, 'getState')
])

// ------------------------------------
// Key
// ------------------------------------

// keyCode :: Event -> KeyCode
export const keyCode = R.either(R.prop('which'), R.prop('keyCode'))

// characterFromKeyCode :: KeyCode -> Char
export const characterFromKeyCode = R.curry(code => String.fromCharCode(code))

// character :: Event -> Char
export const character = R.compose(characterFromKeyCode, keyCode)
