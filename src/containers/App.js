import React, { Component, PropTypes } from 'react'
import Flex from 'containers/Flex'

export default class App extends Component {
  static propTypes = {
    main: PropTypes.element,
    sidebar: PropTypes.element
  }

  render() {
    const { main, sidebar } = this.props

    return (
      <Flex preset="frame">
        <Flex preset="box" fullHeight nogrow width="250px">
          {sidebar}
        </Flex>
        <Flex preset="box" fullHeight>
          {main}
        </Flex>
      </Flex>
    )
  }
}
