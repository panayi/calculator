import React, { Component, PropTypes } from 'react'
import { mapIndexed, propsOrStylesChanged } from 'helpers/pureFunctions'
import { Style } from 'radium'
import Calculation from 'components/Calculation'
import Flex from 'components/Flex'

const _getStyles = function (theme) {
  return {
    h2: {
      position: 'absolute',
      zIndex: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'table',
      width: '50%',
      height: 'auto',
      margin: 'auto',
      paddingLeft: `${theme.gutters.xlarge}px`,
      fontSize: '6vw',
      textAlign: 'center',
      color: theme.colors.fadedText,
    },
    '.ThreeR': {
      display: 'none',
    },
    '.Wrapper': {
      height: '100%',
      overflow: 'auto',
      marginBottom: - theme.gutters.small
    },
    mediaQueries: {
      [theme.screens.smallWidth]: {
        '.ThreeR': {
          display: 'inline'
        }
      }
    }
  }
}

export default class CalculationsList extends Component {
  static propTypes = {
    calculations: PropTypes.array.isRequired,
    deleteCalculation: PropTypes.func.isRequired,
    getStyles: PropTypes.func,
    theme: PropTypes.object.isRequired
  };

  static defaultProps = {
    calculations: [],
    getStyles: _getStyles
  };

  shouldComponentUpdate(nextProps) {
    return propsOrStylesChanged(['calculations'], this.props.getStyles,
      this.props, nextProps)
  }

  componentDidUpdate() {
    const wrapperNode = this.refs.wrapper
    wrapperNode.scrollTop = wrapperNode.scrollHeight
  }

  render() {
    const { calculations, deleteCalculation, getStyles, theme } = this.props
    const results = mapIndexed((calculation, index) =>
      <Calculation
        calculation={calculation}
        key={index}
        onPointerClick={() => deleteCalculation(index)}
        theme={theme}
      />
    , calculations)

    return (
      <Flex className="CalculationsList" preset="box" theme={theme} vertical
        justifyContent="flex-end" inner
      >
        <div ref="wrapper" className="Wrapper">
          <h2>
            <span className="ThreeR">3R </span>calculator
          </h2>
          {results}
        </div>
        <Style scopeSelector=".CalculationsList" rules={getStyles(theme)} />
      </Flex>
    )
  }
}
