import React, { Component, PropTypes } from 'react'
import { propsOrStylesChanged } from 'helpers/pureFunctions'
import Flex from 'containers/Flex'

const _getStyles = function (theme) {
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
    getStyles: PropTypes.func,
    onPointerClick: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired
  }

  static defaultProps = {
    getStyles: _getStyles
  }

  shouldComponentUpdate(nextProps) {
    return propsOrStylesChanged(['calculation'], this.props.getStyles,
      this.props, nextProps)
  }

  render() {
    const { calculation, getStyles, onPointerClick, theme } = this.props
    const styles = getStyles(theme)

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
