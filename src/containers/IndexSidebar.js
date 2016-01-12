import React, { Component, PropTypes } from 'react'
import tinycolor from 'tinycolor2'
import { buttonClicked as _buttonClicked } from 'redux/modules/events'
import { keysSelector } from 'redux/selectors'
import { mapIndexed, propsChanged } from 'helpers/pureFunctions'
import CalculatorButton from 'components/CalculatorButton'
import connect from 'helpers/connectAndTheme'
import Flex from 'containers/Flex'

const _styles = (theme) => {
  return {
    logo: {
      margin: 0,
      fontSize: '224px',
      lineHeight: '176px',
      color: tinycolor(theme.colors.text).desaturate(30).setAlpha(0.5).toString(),
      [theme.screens.mediumHeight]: {
        fontSize: '28vh',
        lineHeight: '22vh'
      },
      [theme.screens.smallHeight]: {
        display: 'none'
      }
    }
  }
}

export class IndexSidebar extends Component {
  static propTypes = {
    keys: PropTypes.array.isRequired,
    buttonClicked: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return propsChanged(['keys', 'settings', 'theme'], this.props, nextProps)
  }

  render() {
    const { buttonClicked, keys, theme } = this.props
    const styles = _styles(theme)
    const buttons = mapIndexed((key, index) =>
      <CalculatorButton
        key={index}
        onClick={buttonClicked}
        theKey={key}
        theme={theme}
      />
    , keys)

    return (
      <Flex preset="box" theme={theme} vertical inner gutterLeft>
        <Flex preset="content" theme={theme}>
          {buttons}
        </Flex>
        <Flex preset="content" theme={theme} nogrow alignSelf="center">
          <h1 style={styles.logo}>3R</h1>
        </Flex>
      </Flex>
    )
  }
}

const selectors = {
  keys: keysSelector
}

export default connect(
  selectors,
  { buttonClicked: _buttonClicked }
)(IndexSidebar)
