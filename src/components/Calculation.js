import React, { Component, PropTypes } from 'react'
import { propsChanged } from 'helpers/pureFunctions'
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
      width: `${theme.gutters.xlarge}px`,
      cursor: 'pointer',
      color: theme.colors.fadedText,
      ':hover': {
        color: theme.colors.text
      }
    }
  }
}

export default class Calculation extends Component {
  static propTypes = {
    calculation: PropTypes.shape({
      input: PropTypes.string,
      output: PropTypes.number
    }).isRequired,
    onPointerClick: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired
  }

  shouldComponentUpdate(nextProps) {
    return propsChanged(['calculation', 'theme'], this.props, nextProps)
  }

  render() {
    const { calculation, onPointerClick, theme } = this.props
    const styles = _styles(theme)

    return (
      <Flex preset="box" theme={theme} inner="small" nowrap>
        <Flex preset="content" theme={theme} gutter="small" inner="small"
          nogrow style={styles.pointer}
        >
          <span onClick={onPointerClick}>—</span>
        </Flex>
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
