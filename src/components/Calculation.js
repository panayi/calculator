import React, { Component, PropTypes } from 'react'
import { Style } from 'radium'
import { propsOrStylesChanged } from 'helpers/pureFunctions'
import Flex from 'components/Flex'

const _getStyles = function (theme) {
  return {
    '.Output': {
      fontSize: theme.fontSizes.xlarge,
      color: theme.colors.accent
    },
    '.Input': {
      fontSize: theme.fontSizes.small,
      marginTop: - theme.gutters.tiny
    },
    '.Pointer': {
      textAlign: 'right',
      width: `${theme.gutters.xlarge}px`,
      cursor: 'pointer',
      color: theme.colors.fadedText
    },
    '.Pointer:hover': {
      color: theme.colors.text
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
  };

  static defaultProps = {
    getStyles: _getStyles
  };

  shouldComponentUpdate(nextProps) {
    return propsOrStylesChanged(['calculation'], this.props.getStyles,
      this.props, nextProps)
  }

  render() {
    const { calculation, getStyles, onPointerClick, theme } = this.props

    return (
      <Flex className="Calculation" preset="box" theme={theme} inner="small"
        nowrap
      >
        <Flex className="Pointer" preset="content" theme={theme} gutter="small"
          inner="small" nogrow
        >
          <span onClick={onPointerClick}>—</span>
        </Flex>
        <Flex preset="content" theme={theme} gutter>
          <div>
            <div className="Output">{calculation.output}</div>
            <div className="Input">= {calculation.input}</div>
          </div>
        </Flex>
        <Style scopeSelector=".Calculation" rules={getStyles(theme)} />
      </Flex>
    )
  }
}
