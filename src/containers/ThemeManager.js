import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Style } from 'radium'
import { createStructuredSelector } from 'reselect'
import { propsChanged } from 'helpers/pureFunctions'
import { themeStylesSelector } from 'redux/selectors'
import 'normalize.css/normalize.css'

export class ThemeManager extends Component {
  static propTypes = {
    styles: PropTypes.object.isRequired,
    children: PropTypes.node
  };

  shouldComponentUpdate(nextProps) {
    return propsChanged(['styles', 'children'], this.props, nextProps)
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
export default connect(selector)(ThemeManager)
