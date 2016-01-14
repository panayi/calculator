import React, { Component, PropTypes } from 'react'
import { Style } from 'radium'
import Octicon from 'react-octicon'
import { propsOrStylesChanged } from 'helpers/pureFunctions'
import Flex from 'components/Flex'

const _getStyles = function (theme) {
  return {
    '.Github': {
      minWidth: '16px',
      minHeight: '16px'
    },
    '.Tweet': {
      minWidth: '68px',
      minHeight: '29px'
    },
    mediaQueries: {
      [theme.screens.mediumWidth]: {
        '.AuthorName': {
          display: 'none !important'
        }
      }
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

    return (
      <Flex className="Author" preset="box" theme={theme}>
        <Flex className="AuthorName" preset="column" theme={theme} inner="tiny">
          <a href={settings.authorUrl}>
            {settings.authorName}
          </a>
        </Flex>
        <Flex className="Github" preset="column" theme={theme} inner="tiny">
          <a href={settings.repoUrl}>
            <Octicon name="mark-github"/>
          </a>
        </Flex>
        <Flex className="tweet" preset="column" theme={theme} inner="tiny">
          <a href="https://twitter.com/share"
            className="twitter-share-button"
            data-text={settings.tweetText}
            data-via={settings.tweetVia}
          >
          </a>
        </Flex>
        <Style scopeSelector=".Author" rules={getStyles(theme)} />
      </Flex>
    )
  }
}
