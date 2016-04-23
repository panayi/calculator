import R from 'ramda'
import tinycolor from 'tinycolor2'
import base from './base'

export default R.compose(
  R.merge(base),
  colors => ({ colors }),
  R.flip(R.call)(tinycolor)
)
