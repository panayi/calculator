import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import R from 'ramda'
import { themeVariablesSelector } from 'redux/selectors'

export default function themedConnect(selectors, ...otherProps) {
  const selector = createStructuredSelector(
    R.merge(
      { theme: themeVariablesSelector },
      R.defaultTo({}, selectors)
    )
  )
  return connect(selector, ...otherProps)
}
