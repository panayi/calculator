import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { propsChanged } from 'helpers/pureFunctions'

export default class Button extends Component {
  static propTypes = {
    active: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    return propsChanged(['active', 'children'], this.props, nextProps)
  }

  render() {
    const {
      active,
      children,
      onClick,
    } = this.props

    const btnClass = classnames({
      button: true,
      'button--active': active,
    })

    return (
      <span className={btnClass} ref="clickTarget" onClick={onClick}>
        {children}
      </span>
    )
  }
}
