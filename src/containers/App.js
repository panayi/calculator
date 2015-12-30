import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import baseThemeVariables from 'themes/_base/variables'
import Flex from 'containers/Flex'
import themeVariablesSelector from 'redux/selectors/themeVariables'

export class App extends Component {
  static propTypes = {
    main: PropTypes.element,
    sidebar: PropTypes.element,
    theme: PropTypes.object
  }

  static defaultProps = {
    theme: baseThemeVariables
  }

  render() {
    const { main, sidebar, theme } = this.props

    return (
      <Flex preset="frame" theme={theme}>
        <Flex preset="box" theme={theme} fullHeight nogrow noshrink width="min-content">
          {sidebar}
        </Flex>
        <Flex preset="box" theme={theme} fullHeight>
          {main}
        </Flex>
      </Flex>
    )
  }
}

const selector = createStructuredSelector({
  theme: themeVariablesSelector
})
export default connect(selector)(App)
