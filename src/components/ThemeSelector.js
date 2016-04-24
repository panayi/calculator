import React, { Component, PropTypes } from 'react'
import Octicon from 'react-octicon'
import { Style } from 'radium'
import { propsChanged } from 'helpers/pureFunctions'
import buttonStyles from 'styles/components/Button'
import stylesVariables from 'styles/variables'
import Button from './Button'

export default class ThemeSelector extends Component {
  static propTypes = {
    themeName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return propsChanged(['themeName'], this.props, nextProps)
  }

  handleClick() {
    const { onClick, themeName } = this.props
    onClick(themeName)
  }

  render() {
    const {
      themeName
    } = this.props
    const styles = buttonStyles(stylesVariables(themeName))

    return (
      <span className="theme-selector">
        <Button ref="themeButton" onClick={this.handleClick}>
          <Octicon name="color-mode" className="theme-selector__icon" />
        </Button>
        <Style scopeSelector=".theme-selector" rules={styles} />
      </span>
    )
  }
}
