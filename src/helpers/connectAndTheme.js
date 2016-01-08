import { connect as reduxConnect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import R from 'ramda'
import { themeVariablesSelector } from 'redux/selectors'

export default function themedConnect(selectors, ...otherSelectors) {
  const selector = createStructuredSelector(R.merge(R.defaultTo({}, selectors), {
    theme: themeVariablesSelector
  }))
  return reduxConnect(selector, ...otherSelectors)
}
