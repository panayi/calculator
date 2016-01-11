import React, { Component, PropTypes } from 'react'
import shouldPureComponentUpdate from 'react-pure-render/function'
import { mapIndexed } from 'helpers/pureFunctions'
import Calculation from 'components/Calculation'
import Flex from 'containers/Flex'

const _styles = (theme) => {
  return {
    overlay: {
      position: 'absolute',
      zIndex: 1,
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
    theme: PropTypes.object.isRequired
  }

  static defaultProps = {
    calculations: []
  }

  shouldPureComponentUpdate = shouldPureComponentUpdate

  render() {
    const { calculations, theme } = this.props
    const styles = _styles(theme)
    const results = mapIndexed((calculation, index) =>
      <Calculation key={index} calculation={calculation} theme={theme} />
    , calculations)

    return (
      <Flex preset="box" theme={theme} vertical justifyContent="flex-end" inner>
        <div style={styles.wrapper}>
          <h1 style={styles.overlay}>calculator</h1>
          {results}
        </div>
      </Flex>
    )
  }
}
