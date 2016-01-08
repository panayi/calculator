import R from 'ramda'
import base from './base'

const numbers = [
  { keyCode: 48, display: '0' },
  { keyCode: 49, display: '1' },
  { keyCode: 50, display: '2' },
  { keyCode: 51, display: '3' },
  { keyCode: 52, display: '4' },
  { keyCode: 53, display: '5' },
  { keyCode: 54, display: '6' },
  { keyCode: 55, display: '7' },
  { keyCode: 56, display: '8' },
  { keyCode: 57, display: '9' }
]

const basicOperations = [
  { keyCode: 43, display: '+' },
  { keyCode: 45, display: '-' },
  { keyCode: 42, display: '*' },
  { keyCode: 47, display: '/' }
]

export default R.reduce(R.concat, [], [
  numbers,
  basicOperations,
  base
])
