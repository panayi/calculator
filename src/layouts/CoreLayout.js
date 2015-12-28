import React, { Component, PropTypes } from 'react'
import Flex from 'containers/Flex'
import ThemeManager from 'containers/ThemeManager'

export default class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.element
  }

  render() {
    const { children } = this.props
    return (
      <ThemeManager>
        <Flex type="frame">
          <Flex type="box" fullHeight nogrow width="150px">
            Sidebar
          </Flex>
          <Flex type="box" fullHeight>
            {children}
          </Flex>
        </Flex>
      </ThemeManager>
    )
  }
}
