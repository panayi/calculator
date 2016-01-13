import React, { Component, PropTypes } from 'react'
import { propsChanged } from 'helpers/pureFunctions'
import Flex from 'components/Flex'
import connect from 'helpers/connectAndTheme'

const getStyles = function (theme) {
  return {
    sidebar: {
      width: theme.layout.sidebarWidth,
      [theme.screens.smallWidth]: {
        display: 'none'
      }
    }
  }
}

export class App extends Component {
  static propTypes = {
    main: PropTypes.element.isRequired,
    sidebar: PropTypes.element,
    theme: PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return propsChanged(['main', 'sidebar', 'theme'], this.props, nextProps)
  }

  render() {
    const { main, sidebar, theme } = this.props
    const styles = getStyles(theme)

    return (
      <Flex preset="frame" theme={theme}>
        <Flex preset="box" theme={theme} fullHeight nogrow noshrink
          style={styles.sidebar}
        >
          {sidebar}
        </Flex>
        <Flex preset="box" theme={theme} fullHeight gutterLeft>
          {main}
        </Flex>
      </Flex>
    )
  }
}

export default connect()(App)
