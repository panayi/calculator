import React, { Component, PropTypes } from 'react'
import Octicon from 'react-octicon'
import { Style } from 'radium'
import { activateTheme as _activateTheme } from 'redux/modules/themes'
import { buttonClicked as _buttonClicked } from 'redux/modules/events'
import { keysSelector, nextThemeNameSelector,
  nextThemeVariablesSelector } from 'redux/selectors'
import { mapIndexed, propsChanged } from 'helpers/pureFunctions'
import Button from 'components/Button'
import connect from 'helpers/connectAndTheme'
import Flex from 'components/Flex'

const getStyles = function (theme) {
  return {
    h1: {
      margin: 0,
      fontSize: '224px',
      lineHeight: '176px',
      color: theme.colors.logo
    },
    mediaQueries: {
      [theme.screens.mediumHeight]: {
        h1: {
          fontSize: '28vh',
          lineHeight: '22vh'
        }
      },
      [theme.screens.smallHeight]: {
        h1: {
          display: 'none'
        }
      }
    }
  }
}

export class IndexSidebar extends Component {
  static propTypes = {
    activateTheme: PropTypes.func.isRequired,
    buttonClicked: PropTypes.func.isRequired,
    keys: PropTypes.array.isRequired,
    nextThemeName: PropTypes.string.isRequired,
    nextThemeVariables: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return propsChanged(['keys', 'nextThemeName', 'theme'],
      this.props, nextProps)
  }

  render() {
    const { activateTheme, buttonClicked, keys, nextThemeName,
      nextThemeVariables, theme } = this.props
    const buttons = mapIndexed((key, index) =>
      <Button
        active={key.active}
        key={index}
        onClick={() => buttonClicked(key)}
        ref={`keyButton_${key.keyCode}`}
        theme={theme}
      >
        {key.display}
      </Button>
    , keys)

    return (
      <Flex className="IndexSidebar" preset="box" theme={theme} vertical inner>
        <Flex preset="content" theme={theme} gutterLeft>
          <Button
            theme={nextThemeVariables}
            onClick={() => activateTheme(nextThemeName)}
            ref="themeButton"
          >
            <Octicon
              name="color-mode"
              style={{ fontSize: theme.fontSizes.button }}
            />
          </Button>
          {buttons}
        </Flex>
        <Flex preset="content" theme={theme} nogrow alignSelf="center">
          <h1>3R</h1>
        </Flex>
        <Style scopeSelector=".IndexSidebar" rules={getStyles(theme)} />
      </Flex>
    )
  }
}

const selectors = {
  keys: keysSelector,
  nextThemeName: nextThemeNameSelector,
  nextThemeVariables: nextThemeVariablesSelector
}
const actions = {
  activateTheme: _activateTheme,
  buttonClicked: _buttonClicked
}

export default connect(selectors, actions)(IndexSidebar)
