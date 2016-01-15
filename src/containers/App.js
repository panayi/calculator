import React, { Component, PropTypes } from 'react'
import { propsChanged } from 'helpers/pureFunctions'
import Flex from 'components/Flex'

export default class App extends Component {
  static propTypes = {
    main: PropTypes.element.isRequired,
    sidebar: PropTypes.element,
  };

  shouldComponentUpdate(nextProps) {
    return propsChanged(['main', 'sidebar'], this.props, nextProps)
  }

  render() {
    const { main, sidebar } = this.props

    return (
      <Flex preset="frame">
        <Flex className="app__sidebar" preset="box" fullHeight nogrow noshrink>
          {sidebar}
        </Flex>
        <Flex preset="box" fullHeight gutterLeft>
          {main}
        </Flex>
      </Flex>
    )
  }
}
