import React, { Component, PropTypes } from 'react'
import { Style } from 'radium'
import { propsChanged } from 'helpers/pureFunctions'
import Flex from 'components/Flex'
import connect from 'helpers/connectAndTheme'

const getStyles = function (theme) {
  return {
    '.Sidebar': {
      width: theme.layout.sidebarWidth
    },
    mediaQueries: {
      [theme.screens.smallWidth]: {
        '.Sidebar': {
          display: 'none !important'
        }
      }
    }
  }
}

export class App extends Component {
  static propTypes = {
    main: PropTypes.element.isRequired,
    sidebar: PropTypes.element,
    theme: PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return propsChanged(['main', 'sidebar', 'theme'], this.props, nextProps)
  }

  render() {
    const { main, sidebar, theme } = this.props

    return (
      <Flex className="App" preset="frame" theme={theme}>
        <Flex className="Sidebar" preset="box" theme={theme} fullHeight nogrow
          noshrink
        >
          {sidebar}
        </Flex>
        <Flex preset="box" theme={theme} fullHeight gutterLeft>
          {main}
        </Flex>
        <Style scopeSelector=".App" rules={getStyles(theme)} />
      </Flex>
    )
  }
}

export default connect()(App)
