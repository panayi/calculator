import React, { Component, PropTypes } from 'react'
import Octicon from 'react-octicon'
import { propsChanged } from 'helpers/pureFunctions'
import Flex from 'components/Flex'

export default class Calculate extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return propsChanged(['settings'], this.props, nextProps)
  }

  render() {
    const { settings } = this.props

    return (
      <Flex preset="box">
        <Flex className="author__name" preset="column" inner="tiny">
          <a href={settings.authorUrl}>
            {settings.authorName}
          </a>
        </Flex>
        <Flex className="author__github" preset="column" inner="tiny">
          <a href={settings.repoUrl}>
            <Octicon name="mark-github"/>
          </a>
        </Flex>
        <Flex className="author__tweet" preset="column" inner="tiny">
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
