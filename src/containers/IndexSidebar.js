import React, { Component, PropTypes } from 'react'
import R from 'ramda'
import Octicon from 'react-octicon'
import tinycolor from 'tinycolor2'
import { buttonClicked as _buttonClicked } from 'redux/modules/events'
import CalculatorButton from 'components/CalculatorButton'
import connect from 'helpers/connectAndTheme'
import Flex from 'containers/Flex'
import { keysSelector, settingsSelector } from 'redux/selectors'
import pureRender from 'helpers/pureRender'

const _styles = (themeVariables) => {
  return {
    logo: {
      margin: 0,
      fontSize: '11.7vw',
      lineHeight: '11.7vw',
      color: tinycolor(themeVariables.colors.text).desaturate(30).setAlpha(0.5).toString(),
      '@media (max-width: 645px)': {
        fontSize: '75.465px',
        lineHeight: '75.465px'
      }
    },
    itemsWrapper: {
      margin: '0 -3px',
      '@media (max-width: 645px)': {
        flexWrap: 'nowrap'
      }
    },
    author: {
      '@media (max-width: 645px)': {
        display: 'none'
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

  render() {
    const { buttonClicked, keys, settings, theme } = this.props
    const styles = _styles(theme)
    const mapIndexed = R.addIndex(R.map)
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
        <Flex preset="content" theme={theme} grow="4" gutter>{buttons}</Flex>
        <Flex preset="content" theme={theme} nogrow alignSelf="center" gutter>
          <h1 style={styles.logo}>3R</h1>
        </Flex>
        <Flex preset="box" theme={theme} nogrow gutter="tiny" justifyContent="center" style={styles.itemsWrapper}>
          <Flex preset="column" theme={theme} inner="tiny" style={styles.author}>
            <a href={settings.authorUrl}>{settings.authorName}</a>
          </Flex>
          <Flex preset="column" theme={theme} inner="tiny">
            <a href={settings.repoUrl}><Octicon name="mark-github"/></a>
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
)(pureRender(IndexSidebar))
