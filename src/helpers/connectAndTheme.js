import { PropTypes } from 'react'
import { connect as reduxConnect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import R from 'ramda'
import baseThemeVariables from 'themes/_base/variables'
import themeVariablesSelector from 'redux/selectors/themeVariables'

function theme(Component) {
  return class extends Component {
    static defaultProps = R.merge(R.defaultTo({}, Component.defaultProps), {
      theme: baseThemeVariables
    })

    static propTypes = R.merge(R.defaultTo({}, Component.propTypes), {
      theme: PropTypes.object
    })
  }
}

function connect(selectors, ...other) {
  const selector = createStructuredSelector(R.merge(R.defaultTo({}, selectors), {
    theme: themeVariablesSelector
  }))
  return reduxConnect(selector, ...other)
}


export {
  theme as Theme,
  connect
}
