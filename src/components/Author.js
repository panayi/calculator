import React, { Component, PropTypes } from 'react'
import Octicon from 'react-octicon'
import { propsChanged } from 'helpers/pureFunctions'
import Flex from 'containers/Flex'

const getStyles = (theme) => {
  return {
    author: {
      [theme.screens.mediumWidth]: {
        display: 'none'
      },
      [theme.screens.smallWidth]: {
        display: 'inline'
      }
    },
    github: {
      minWidth: '16px',
      minHeight: '16px'
    },
    tweet: {
      minWidth: '68px',
      minHeight: '29px'
    }
  }
}

export default class Calculate extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return propsChanged(['settings', 'theme'], this.props, nextProps)
  }

  render() {
    const { settings, theme } = this.props
    const styles = getStyles(theme)

    return (
      <Flex preset="box" theme={theme}>
        <Flex preset="column" theme={theme} inner="tiny" style={styles.author}>
          <a className="author-name" href={settings.authorUrl}>
            {settings.authorName}
          </a>
        </Flex>
        <Flex preset="column" theme={theme} inner="tiny" style={styles.gihub}>
          <a className="repo-url" href={settings.repoUrl}>
            <Octicon name="mark-github"/>
          </a>
        </Flex>
        <Flex preset="column" theme={theme} inner="tiny" style={styles.tweet}>
          <a href="https://twitter.com/share"
            className="twitter-share-button"
            data-text={settings.tweetText}
            data-via={settings.tweetVia}
          >
          </a>
        </Flex>
      </Flex>
    )
  }
}
