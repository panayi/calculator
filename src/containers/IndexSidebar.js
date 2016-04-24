import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { activateTheme as _activateTheme } from 'redux/modules/themes'
import { keyClicked as _keyClicked } from 'redux/modules/events'
import { keysSelector, nextThemeNameSelector } from 'redux/selectors'
import { mapIndexed, propsChanged } from 'helpers/pureFunctions'
import Button from 'components/Button'
import Flex from 'components/Flex'
import ThemeSelector from 'components/ThemeSelector'

export class IndexSidebar extends Component {
  static propTypes = {
    activateTheme: PropTypes.func.isRequired,
    keyClicked: PropTypes.func.isRequired,
    keys: PropTypes.array.isRequired,
    nextThemeName: PropTypes.string.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return propsChanged(['keys', 'nextThemeName'], this.props, nextProps)
  }

  render() {
    const { activateTheme, keyClicked, keys, nextThemeName } = this.props
    const buttons = mapIndexed((key, index) =>
      <Button
        active={key.active}
        key={index}
        onClick={function () { keyClicked(key) }}
        ref={`keyButton_${key.keyCode}`}
      >
        {key.display}
      </Button>
    , keys)

    return (
      <Flex className="IndexSidebar" preset="box" vertical inner>
        <Flex preset="content" gutterLeft>
          <ThemeSelector onClick={activateTheme} themeName={nextThemeName} />
          {buttons}
        </Flex>
        <Flex preset="content" nogrow alignSelf="center">
          <h1 className="index-sidebar__logo">3R</h1>
        </Flex>
      </Flex>
    )
  }
}

const selector = createStructuredSelector({
  keys: keysSelector,
  nextThemeName: nextThemeNameSelector
})
const actions = {
  activateTheme: _activateTheme,
  keyClicked: _keyClicked
}

export default connect(selector, actions)(IndexSidebar)
