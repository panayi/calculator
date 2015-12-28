import React, { Component, PropTypes } from 'react'
import R from 'ramda'

const shortcutResolvers = {
  frame: function frame(Flex, value, hash, theme) {
    this.height('100vh', hash, theme)
    this.overflow({ x: 'hidden', y: 'hidden' }, hash, theme)
    this.flex(true, hash, theme)
    this.grow(true, hash, theme)
    this.shrink(true, hash, theme)
    this.flexBasis('auto', hash, theme)
    this.horizontal(true, hash, theme)
    this.nowrap(true, hash, theme)
    this.align('left', hash, theme)
    this.order(0, hash, theme)
    hash.boxSizing = 'border-box'
    hash.position = 'relative'
  },

  box: function box(Flex, value, hash, theme) {
    this.height('auto', hash, theme)
    this.flex(true, hash, theme)
    this.grow(true, hash, theme)
    this.shrink(true, hash, theme)
    this.flexBasis('auto', hash, theme)
    this.horizontal(true, hash, theme)
    this.wrap(true, hash, theme)
    this.align('left', hash, theme)
    this.order(0, hash, theme)
    hash.boxSizing = 'border-box'
    hash.position = 'relative'
  },

  column: function column(Flex, value, hash, theme) {
    Flex.typeResolver('box', hash, theme)
    this.verticalCenter(true, hash, theme)
    this.inner(true, hash, theme)
    this.gutterLeft(true, hash, theme)
  },

  content: function content(Flex, value, hash, theme) {
    this.grow(true, hash, theme)
    this.shrink(true, hash, theme)
    this.flexBasis('auto', hash, theme)
    hash.boxSizing = 'border-box'
  }
}

const directionalStyles = (_directions, hash, prefix, resolver) => {
  const directions = !R.isArrayLike(directions) ? _directions : [_directions]

  let key
  R.forEach((direction) => {
    if (prefix) {
      key = prefix + direction.charAt(0).toUpperCase() + direction.slice(1)
    } else {
      key = direction
    }
    if (R.is(Object, resolver)) {
      hash[key] = resolver[direction]
    } else if (R.is(Function, resolver)) {
      hash[key] = resolver(direction)
    } else {
      hash[key] = resolver
    }
  }, directions)
}

/**
 * Base component for implementing CSS Flex.
 * Avoid using <Flex> component directly whenever possible.
 * Instead use {@link Box}, {@link Column}, {@link Content}, and {@link Frame}.
 * @see https://css-tricks.com/snippets/css/a-guide-to-flexbox/
 * @extends {Component}
 */
export default class Flex extends Component {
  static propTypes = {
    theme: PropTypes.object,
    type: PropTypes.oneOf([
      'frame',
      'box',
      'column',
      'content'
    ]).isRequired,
    style: PropTypes.object,
    children: PropTypes.node,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    /**
     * display: flex
     */
    flex: PropTypes.bool,
    /**
     * flex-wrap: wrap
     */
    wrap: PropTypes.bool,
    /**
     * flex-wrap: nowrap
     */
    nowrap: PropTypes.bool,
    /**
     * flex-direction: column
     */
    vertical: PropTypes.bool,
    /**
     * flex-direction: row
     */
    horizontal: PropTypes.bool,
    /**
     * flex-direction: column-reverse|row-reverse
     */
    reverseDirection: PropTypes.bool,
    /**
     * flex-grow: 1
     */
    grow: PropTypes.bool,
    /**
     * flex-grow: 0
     */
    nogrow: PropTypes.bool,
    /**
     * flex-shrink: 1
     */
    shrink: PropTypes.bool,
    /**
     * flex-shrink: 0
     */
    noshrink: PropTypes.bool,
    /**
     * flex-basis: {value}
     */
    flexBasis: PropTypes.string,
    /**
     * justifyContent: left:flex-start|right:flex-end|center:center|justify:space-between|spaced:space-around
     */
    align: PropTypes.string,
    /**
     * order: {value}
     */
    order: PropTypes.number,
    /**
     * Array of directions, e.g. ['right', 'bottom']
     */
    border: PropTypes.array,
    /**
     * border-color: borderColor
     */
    borderColor: PropTypes.string,
    /**
     * Object e.g. { left: '20px', top: '30px' }
     */
    padding: PropTypes.object,
    /**
     * Object e.g. { top: '10px', bottom: '10px' }
     */
    margin: PropTypes.object,
    /**
     * Object e.g. { top: '0', bottom: '0' }
     */
    position: PropTypes.object,
    /**
     * Object e.g. { x: 'hidden', y: 'scroll' }
     */
    overflow: PropTypes.object,
    /**
     * paddingLeft: {theme.rawTheme.spacing.desktopGutterLess}
     */
    gutterLeft: PropTypes.bool,
    /**
     * paddingRight: {theme.rawTheme.spacing.desktopGutterLess}
     */
    gutterRight: PropTypes.bool,
    /**
     * gutterLeft && gutterRight
     */
    gutter: PropTypes.bool,
    /**
     * paddingTop: {theme.rawTheme.spacing.desktopGutterLess};
     * paddingBottom: {theme.rawTheme.spacing.desktopGutterLess}
     */
    inner: PropTypes.bool,
    /**
     * align-items: 'center'
     */
    verticalCenter: PropTypes.bool,
    /**
     * justify-content: 'center'
     */
    horizontalCenter: PropTypes.bool,
    /**
     * verticalCenter && horizontalCenter
     */
    center: PropTypes.bool,
    /**
     * align-items: 'flex-start'
     */
    top: PropTypes.bool,
    /**
     * align-items: 'flex-end'
     */
    bottom: PropTypes.bool,
    /**
     * position: fixed
     */
    fixed: PropTypes.bool,
    /**
     * width: 100%
     */
    fullWidth: PropTypes.bool,
    /**
     * height: 100%
     */
    fullHeight: PropTypes.bool,
    /**
     * fullWidth && fullHeight
     */
    full: PropTypes.bool
  }

  static styleResolvers = {
    width(value, hash) {
      hash.width = value
    },

    height(value, hash) {
      hash.height = value
    },

    flex(value, hash) {
      hash.display = 'flex'
    },

    wrap(value, hash) {
      hash.flexWrap = 'wrap'
    },

    nowrap(value, hash) {
      hash.flexWrap = 'nowrap'
    },

    vertical(value, hash) {
      hash.flexDirection = 'column'
    },

    horizontal(value, hash) {
      hash.flexDirection = 'row'
    },

    reverseDirection(value, hash) {
      hash.flexDirection += '-reverse'
    },

    grow(value, hash) {
      hash.flexGrow = 1
    },

    nogrow(value, hash) {
      hash.flexGrow = 0
    },

    shrink(value, hash) {
      hash.flexShrink = 1
    },

    noshrink(value, hash) {
      hash.flexShrink = 0
    },

    flexBasis(value, hash) {
      hash.flexBasis = value
    },

    align(value, hash) {
      if (value === 'left') {
        hash.justifyContent = 'flex-start'
      } else if (value === 'right') {
        hash.justifyContent = 'flex-end'
      } else if (value === 'center') {
        hash.justifyContent = 'center'
      } else if (value === 'justify') {
        hash.justifyContent = 'space-between'
      } else if (value === 'spaced') {
        hash.justifyContent = 'space-around'
      }
    },

    order(value, hash) {
      hash.order = value
    },

    border(value, hash, theme) {
      const rule = 'solid 1px ' + theme.colors.border
      directionalStyles(value, hash, 'border', rule)
    },

    borderColor(value, hash, theme) {
      hash.borderColor = value
    },

    position(value, hash) {
      const directions = R.keys(value)
      directionalStyles(directions, hash, null, value)
    },

    overflow(value, hash) {
      const directions = R.keys(value)
      directionalStyles(directions, hash, 'overflow', value)
    },

    gutterLeft(value, hash, theme) {
      const padding = theme.gutter
      hash.paddingLeft = `${padding}px`
    },

    gutterRight(value, hash, theme) {
      const padding = theme.gutter
      hash.paddingRight = `${padding}px`
    },

    gutter(value, hash, theme) {
      this.gutterLeft(value, hash, theme)
      this.gutterRight(value, hash, theme)
    },

    nogutter(value, hash) {
      hash.paddingLeft = 0
      hash.paddingRight = 0
    },

    margin(value, hash) {
      const directions = R.keys(value)
      directionalStyles(directions, hash, 'margin', value)
    },

    padding(value, hash) {
      const directions = R.keys(value)
      directionalStyles(directions, hash, 'padding', value)
    },

    inner(value, hash, theme) {
      const padding = theme.gutter
      hash.paddingTop = `${padding}px`
      hash.paddingBottom = `${padding}px`
    },

    verticalCenter(value, hash) {
      hash.alignItems = 'center'
    },

    horizontalCenter(value, hash) {
      hash.justifyContent = 'center'
    },

    center(value, hash) {
      hash.alignItems = 'center'
      hash.justifyContent = 'center'
    },

    top(value, hash) {
      hash.alignItems = 'flex-start'
    },

    bottom(value, hash) {
      hash.alignItems = 'flex-end'
    },

    fixed(value, hash) {
      hash.position = 'fixed'
    },

    fullWidth(value, hash) {
      hash.width = '100%'
    },

    fullHeight(value, hash) {
      hash.height = '100%'
    },

    full(value, hash) {
      hash.width = '100%'
      hash.height = '100%'
    }
  }

  static typeResolver = (value, hash, theme) => {
    shortcutResolvers[value].call(Flex.styleResolvers, Flex, value, hash, theme)
  }

  getStyles() {
    const {
      type,
      style,
      theme
    } = this.props
    const props = this.props
    const styleResolvers = Flex.styleResolvers
    let key
    let value
    let hash = {} // eslint-disable-line prefer-const

    // Resolve styles from type
    Flex.typeResolver(type, hash, theme)

    // Resolve styles from properties
    for (key in styleResolvers) {
      if (styleResolvers.hasOwnProperty(key)) {
        value = props[key]
        if (value) {
          styleResolvers[key](value, hash, theme)
        }
      }
    }

    // this.props.style overrides internal styles
    return R.merge(hash, style)
  }

  render() {
    return (
      <div style={this.getStyles()}>{this.props.children}</div>
    )
  }
}
