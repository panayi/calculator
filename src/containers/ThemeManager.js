import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Style } from 'radium'
import { createStructuredSelector } from 'reselect'
import { propsChanged } from 'helpers/pureFunctions'
import { activeThemeNameSelector } from 'redux/selectors'
import createStyles from 'styles'
import 'normalize.css/normalize.css'

export class ThemeManager extends Component {
  static propTypes = {
    activeThemeName: PropTypes.string.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return propsChanged(['activeThemeName'], this.props, nextProps)
  }

  render() {
    const { activeThemeName } = this.props
    const styles = createStyles(activeThemeName)

    return (
      <Style rules={styles} />
    )
  }
}

const selector = createStructuredSelector({
  activeThemeName: activeThemeNameSelector
})
export default connect(selector)(ThemeManager)
