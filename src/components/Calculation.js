import React, { Component, PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import Flex from 'containers/Flex'

const _styles = (theme) => {
  return {
    output: {
      fontSize: theme.fontSizes.xlarge,
      color: theme.colors.accent
    },
    input: {
      fontSize: theme.fontSizes.small,
      marginTop: - theme.gutters.tiny
    },
    pointer: {
      textAlign: 'right',
      color: theme.colors.fadedText
    }
  }
}

export default class Calculation extends Component {
  static propTypes = {
    calculation: PropTypes.shape({
      input: PropTypes.string,
      output: PropTypes.number
    }).isRequired,
    theme: PropTypes.object.isRequired
  }

  shouldPureComponentUpdate = shouldPureComponentUpdate

  render() {
    const { calculation, theme } = this.props
    const styles = _styles(theme)

    return (
      <Flex preset="box" theme={theme} inner="small">
        <Flex preset="content" theme={theme} gutter="small" inner="small" width={theme.gutters.xlarge}
          nogrow style={styles.pointer}
        >—</Flex>
        <Flex preset="content" theme={theme} gutter>
          <div>
            <div style={styles.output}>{calculation.output}</div>
            <div style={styles.input}>= {calculation.input}</div>
          </div>
        </Flex>
      </Flex>
    )
  }
}
