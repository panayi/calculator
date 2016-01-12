import React, { Component, PropTypes } from 'react'
import { mapIndexed, propsChanged } from 'helpers/pureFunctions'
import Calculation from 'components/Calculation'
import Flex from 'containers/Flex'

const _styles = (theme) => {
  return {
    overlay: {
      position: 'absolute',
      zIndex: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      fontSize: '6vw',
      width: '29%',
      height: '29%',
      margin: 'auto',
      textAlign: 'center',
      color: theme.colors.fadedText,
      [theme.screens.smallWidth]: {
        width: '35%'
      }
    },
    threeR: {
      display: 'none',
      [theme.screens.smallWidth]: {
        display: 'inline'
      }
    },
    wrapper: {
      height: '100%',
      overflow: 'auto',
      marginBottom: - theme.gutters.small
    }
  }
}

export default class CalculationsList extends Component {
  static propTypes = {
    calculations: PropTypes.array.isRequired,
    deleteCalculation: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired
  }

  static defaultProps = {
    calculations: []
  }

  shouldComponentUpdate(nextProps) {
    return propsChanged(['calculations', 'theme'], this.props, nextProps)
  }

  componentDidUpdate() {
    const wrapperNode = this.refs.wrapper
    wrapperNode.scrollTop = wrapperNode.scrollHeight
  }

  render() {
    const { calculations, deleteCalculation, theme } = this.props
    const styles = _styles(theme)
    const results = mapIndexed((calculation, index) =>
      <Calculation
        calculation={calculation}
        key={index}
        onPointerClick={() => deleteCalculation(index)}
        theme={theme}
      />
    , calculations)

    return (
      <Flex preset="box" theme={theme} vertical justifyContent="flex-end" inner>
        <div ref="wrapper" style={styles.wrapper}>
          <h1 style={styles.overlay}>
            <span style={styles.threeR}>3R </span>calculator
          </h1>
          {results}
        </div>
      </Flex>
    )
  }
}
