import React, { Component, PropTypes } from 'react'
import Octicon from 'react-octicon'
import tinycolor from 'tinycolor2'
import { buttonClicked as _buttonClicked } from 'redux/modules/events'
import { keysSelector, settingsSelector } from 'redux/selectors'
import { mapIndexed, propsChanged } from 'helpers/pureFunctions'
import CalculatorButton from 'components/CalculatorButton'
import connect from 'helpers/connectAndTheme'
import Flex from 'containers/Flex'

const _styles = (theme) => {
  return {
    logo: {
      margin: 0,
      fontSize: '185px',
      lineHeight: '185px',
      color: tinycolor(theme.colors.text).desaturate(30).setAlpha(0.5).toString(),
      [theme.screens.smallHeight]: {
        fontSize: '23.5vh',
        lineHeight: '23.5vh'
      }
    },
    tweet: {
      display: 'inline-block',
      verticalAlign: 'middle',
      minWidth: '62px',
      minHeight: '23px'
    }
  }
}

export class IndexSidebar extends Component {
  static propTypes = {
    keys: PropTypes.array.isRequired,
    buttonClicked: PropTypes.func.isRequired,
    settings: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return propsChanged(['keys', 'settings', 'theme'], this.props, nextProps)
  }

  render() {
    const { buttonClicked, keys, settings, theme } = this.props
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
      <Flex preset="box" theme={theme} vertical inner>
        <Flex preset="content" theme={theme} grow="4" gutterLeft>
          {buttons}
        </Flex>
        <Flex preset="content" theme={theme} nogrow alignSelf="center">
          <h1 style={styles.logo}>3R</h1>
        </Flex>
        <Flex preset="box" theme={theme} nogrow gutter="tiny" alignSelf="center">
          <Flex preset="column" theme={theme} inner="tiny" style={styles.author}>
            <a className="author-name" href={settings.authorUrl}>
              {settings.authorName}
            </a>
          </Flex>
          <Flex preset="column" theme={theme} inner="tiny">
            <a className="repo-url" href={settings.repoUrl}>
              <Octicon name="mark-github"/>
            </a>
          </Flex>
          <Flex preset="column" theme={theme} inner="tiny">
            <a href="https://twitter.com/share"
              className="twitter-share-button"
              data-text={settings.tweetText}
              data-via={settings.tweetVia}
            >
            </a>
          </Flex>
        </Flex>
      </Flex>
    )
  }
}

const selectors = {
  settings: settingsSelector,
  keys: keysSelector
}

export default connect(
  selectors,
  { buttonClicked: _buttonClicked }
)(IndexSidebar)
