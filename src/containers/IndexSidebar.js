import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import Octicon from 'react-octicon'
import tinycolor from 'tinycolor2'
import baseThemeVariables from 'themes/_base/variables'
import Flex from 'containers/Flex'
import themeVariablesSelector from 'redux/selectors/themeVariables'

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
      verticalAlign: 'middle',
      minWidth: '62px',
      minHeight: '23px'
    }
  }
}

const config = {
  author: {
    name: 'Panagiotis Panagi',
    url: 'https://github.com/panayi'
  },
  repo: {
    url: 'https://github.com/panayi/calculator'
  },
  tweet: {
    text: '3R Calculator build with React Redux and Ramda',
    via: 'ppanagi'
  }
}

export class IndexSidebar extends Component {
  static propTypes = {
    themeVariables: PropTypes.object
  }

  static defaultProps = {
    themeVariables: baseThemeVariables
  }

  render() {
    const { themeVariables } = this.props
    const styles = _styles(themeVariables)

    return (
      <Flex preset="box" theme={themeVariables} vertical inner>
        <Flex preset="content" theme={themeVariables} grow="4" gutter />
        <Flex preset="content" nogrow alignSelf="center">
          <h1 style={styles.logo}>3R</h1>
        </Flex>
        <Flex preset="content" nogrow alignSelf="center">
          <a href={config.author.url} style={styles.author}>{config.author.name}</a>
          <a href={config.repo.url} style={styles.icon}><Octicon name="mark-github"/></a>
          <span style={styles.tweet}>
            <a href="https://twitter.com/share"
              className="twitter-share-button"
              data-text={config.tweet.text}
              data-via={config.tweet.via}
            >
            </a>
          </span>
        </Flex>
      </Flex>
    )
  }
}


const selector = createStructuredSelector({
  themeVariables: themeVariablesSelector
})
export default connect(selector)(IndexSidebar)
