import React, { Component, PropTypes } from 'react'
import Octicon from 'react-octicon'
import tinycolor from 'tinycolor2'
import { Theme, connect } from 'helpers/connectAndTheme'
import Flex from 'containers/Flex'

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

class IndexSidebar extends Component {
  static propTypes = {
    theme: PropTypes.object
  }

  render() {
    const { theme } = this.props
    const styles = _styles(theme)

    return (
      <Flex preset="box" theme={theme} vertical inner>
        <Flex preset="content" theme={theme} grow="4" gutter />
        <Flex preset="content" theme={theme} nogrow alignSelf="center" gutter>
          <h1 style={styles.logo}>3R</h1>
        </Flex>
        <Flex preset="box" theme={theme} nogrow gutter="tiny" justifyContent="center" style={styles.itemsWrapper}>
          <Flex preset="column" theme={theme} inner="tiny" style={styles.author}>
            <a href={config.author.url}>{config.author.name}</a>
          </Flex>
          <Flex preset="column" theme={theme} inner="tiny">
            <a href={config.repo.url}><Octicon name="mark-github"/></a>
          </Flex>
          <Flex preset="column" theme={theme} inner="tiny">
            <a href="https://twitter.com/share"
              className="twitter-share-button"
              data-text={config.tweet.text}
              data-via={config.tweet.via}
            >
            </a>
          </Flex>
        </Flex>
      </Flex>
    )
  }
}

IndexSidebar = Theme(IndexSidebar)

export default connect()(IndexSidebar)

export {
  IndexSidebar
}
