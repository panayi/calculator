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
      fontSize: '150px',
      // color: '#8799a6'
      color: tinycolor(themeVariables.colors.text).desaturate(30).setAlpha(0.5).toString()
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
            <Flex preset="content" grow="4" />
            <Flex preset="content" nogrow alignSelf="center" style={styles.logo}>3R</Flex>
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
