import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Style } from 'radium'
import { createStructuredSelector } from 'reselect'
import { themeStylesSelector } from 'redux/selectors'
import pureRender from 'helpers/pureRender'
import 'styles/normalize.css'

export class ThemeManager extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired,
    children: PropTypes.node
  }

  render() {
    const { styles } = this.props

    return (
      <div>
        <Style rules={styles} />
        {this.props.children}
      </div>
    )
  }
}

const selector = createStructuredSelector({
  styles: themeStylesSelector
})
export default connect(selector)(pureRender(ThemeManager))
