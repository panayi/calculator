import R from 'ramda'
import globalStyles from './globalStyles'
import components from './components/all'
import _variables from './variables'

export default(themeName) => {
  const variables = _variables(themeName)
  return R.reduce(
    (styles, component) => R.merge(styles, component(variables)),
    {},
    R.append(globalStyles, components)
  )
}
