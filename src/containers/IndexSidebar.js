import React, { Component, PropTypes } from 'react'
import Octicon from 'react-octicon'
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
    logo: {
      margin: 0,
      fontSize: '224px',
      lineHeight: '176px',
      color: theme.colors.logo,
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
    const styles = getStyles(theme)
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
      <Flex preset="box" theme={theme} vertical inner gutterLeft>
        <Flex preset="content" theme={theme}>
          <Button
            theme={nextThemeVariables}
            onClick={() => activateTheme(nextThemeName)}
            ref="themeButton"
          >
            <Octicon name="color-mode" style={{ fontSize: '37px' }}/>
          </Button>
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
  keys: keysSelector,
  nextThemeName: nextThemeNameSelector,
  nextThemeVariables: nextThemeVariablesSelector
}
const actions = {
  activateTheme: _activateTheme,
  buttonClicked: _buttonClicked
}

export default connect(selectors, actions)(IndexSidebar)
