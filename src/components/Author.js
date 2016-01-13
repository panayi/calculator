import React, { Component, PropTypes } from 'react'
import Octicon from 'react-octicon'
import { propsOrStylesChanged } from 'helpers/pureFunctions'
import Flex from 'components/Flex'

const _getStyles = function (theme) {
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
    getStyles: PropTypes.func,
    settings: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };

  static defaultProps = {
    getStyles: _getStyles
  };

  shouldComponentUpdate(nextProps) {
    return propsOrStylesChanged(['settings'], this.props.getStyles,
      this.props, nextProps)
  }

  render() {
    const { getStyles, settings, theme } = this.props
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
