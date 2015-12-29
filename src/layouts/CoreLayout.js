import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Octicon from 'react-octicon'
import Flex from 'containers/Flex'
import ThemeManager from 'containers/ThemeManager'
import themeVariablesSelector from 'redux/selectors/themeVariables'

import tinycolor from 'tinycolor2'

const _styles = (themeVariables) => {
  return {
    logo: {
      margin: 0,
      fontSize: '150px',
      color: tinycolor(themeVariables.colors.text).desaturate(30).setAlpha(0.5).toString(),
    },
    author: {
      paddingRight: '8px'
    },
    icon: {
      paddingRight: '16px'
    },
    tweet: {
      display: 'inline-block',
      verticalAlign: 'middle'
    },
    overlay: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      fontSize: '6vw',
      width: '29%',
      height: '29%',
      margin: 'auto',
      textAlign: 'center',
      color: tinycolor(themeVariables.colors.canvas).setAlpha(0.7).toString(),
    }
  }
}

export class CoreLayout extends Component {
  static propTypes = {
    children: PropTypes.element,
    themeVariables: PropTypes.object
  }

  render() {
    const { children, themeVariables } = this.props
    const styles = _styles(themeVariables)

    return (
      <ThemeManager>
        <Flex preset="frame">
          <Flex preset="box" theme={themeVariables} fullHeight vertical nogrow inner width="250px">
            <Flex preset="content" theme={themeVariables} grow="4" gutter />
            <Flex preset="content" nogrow alignSelf="center">
              <h1 style={styles.logo}>3R</h1>
            </Flex>
            <Flex preset="content" nogrow alignSelf="center">
              <a href="https://github.com/panayi" style={styles.author}>Panagiotis Panagi</a>
              <a href="https://github.com/panayi/calculator" style={styles.icon}><Octicon name="mark-github"/></a>
              <span style={styles.tweet}>
                <a href="https://twitter.com/share"
                  className="twitter-share-button"
                  data-text="3R Calculator build with React Redux and Ramda"
                  data-via="ppanagi"
                >
                  Tweet
                </a>
              </span>
            </Flex>
          </Flex>
          <Flex preset="box" fullHeight>
            {children}
            <h1 style={styles.overlay}>calculator</h1>
          </Flex>
        </Flex>
      </ThemeManager>
    )
  }
}

const selector = createStructuredSelector({
  themeVariables: themeVariablesSelector
})
export default connect(selector)(CoreLayout)
