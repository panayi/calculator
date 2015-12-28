import React, { Component, PropTypes } from 'react'
import R from 'ramda'

const styles = {
  align: R.objOf('justifyContent'),
  boxSizing: R.objOf('boxSizing'),
  center: R.merge(R.objOf('alignItems', 'center'), R.objOf('justifyContent', 'center')),
  flex: R.objOf('display', 'flex'),
  flexBasis: R.objOf('flexBasis'),
  full: R.merge(R.objOf('width', '100%'), R.objOf('height', '100%')),
  fullHeight: R.objOf('height', '100%'),
  fullWidth: R.objOf('width', '100%'),
  grow: R.objOf('flexGrow', 1),
  height: R.objOf('height'),
  horizontal: R.objOf('flexDirection', 'row'),
  horizontalCenter: R.objOf('justifyContent', 'center'),
  horizontalReverse: R.objOf('flexDirection', 'row-reverse'),
  nogrow: R.objOf('flexGrow', 0),
  nogutter: R.merge(R.objOf('paddingRight', 0), R.objOf('paddingLeft', 0)),
  noshrink: R.objOf('flexShrink', 0),
  nowrap: R.objOf('flexWrap', 'nowrap'),
  order: R.objOf('order'),
  overflowX: R.objOf('overflowX'),
  overflowY: R.objOf('overflowY'),
  position: R.objOf('position'),
  shrink: R.objOf('flexShrink', 1),
  vertical: R.objOf('flexDirection', 'column'),
  verticalCenter: R.objOf('alignItems', 'center'),
  verticalReverse: R.objOf('flexDirection', 'column-reverse'),
  width: R.objOf('width'),
  wrap: R.objOf('flexWrap', 'wrap'),
  gutterLeft: (value, theme) => {
    return { paddingLeft: `${theme.gutter}px` }
  },
  gutterRight: (value, theme) => {
    return { paddingRight: `${theme.gutter}px` }
  },
  gutter: (value, theme) => {
    return {
      paddingRight: `${theme.gutter}px`,
      paddingLeft: `${theme.gutter}px`
    }
  },
  inner: (value, theme) => {
    return {
      paddingTop: `${theme.gutter}px`,
      paddingBottom: `${theme.gutter}px`
    }
  }
}

const presets = {
  base: {
  },

  frame: R.mergeAll([
    styles.height('100vh'),
    styles.overflowX('hidden'),
    styles.overflowY('hidden'),
    styles.flex,
    styles.grow,
    styles.shrink,
    styles.flexBasis('auto'),
    styles.horizontal,
    styles.nowrap,
    styles.align('left'),
    styles.order(0),
    styles.boxSizing('border-box'),
    styles.position('relative')
  ]),

  box: R.mergeAll([
    styles.height('auto'),
    styles.flex,
    styles.grow,
    styles.shrink,
    styles.flexBasis('auto'),
    styles.horizontal,
    styles.wrap,
    styles.align('left'),
    styles.order(0),
    styles.boxSizing('border-box'),
    styles.position('relative'),
  ]),

  content: R.mergeAll([
    styles.grow,
    styles.shrink,
    styles.flexBasis('auto'),
    styles.boxSizing('border-box')
  ])
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
    preset: PropTypes.oneOf([
      'frame',
      'box',
      'column',
      'content'
    ]),
    style: PropTypes.object,
    children: PropTypes.node,
    width: PropTypes.string,
    height: PropTypes.string,

    // display: flex
    flex: PropTypes.bool,

    // flex-wrap: wrap
    wrap: PropTypes.bool,

    // flex-wrap: nowrap
    nowrap: PropTypes.bool,

    // flex-direction: column
    vertical: PropTypes.bool,

    // flex-direction: row
    horizontal: PropTypes.bool,

    // flex-direction: column-reverse
    verticalReverse: PropTypes.bool,

    // flex-direction: row-reverse
    horizontalReverse: PropTypes.bool,

    // flex-grow: 1
    grow: PropTypes.bool,

    // flex-grow: 0
    nogrow: PropTypes.bool,

    // flex-shrink: 1
    shrink: PropTypes.bool,

    // flex-shrink: 0
    noshrink: PropTypes.bool,

    // flex-basis: {value}
    flexBasis: PropTypes.string,

    // justify-content: left:flex-start|right:flex-end|center:center|
    //                  justify:space-between|spaced:space-around
    align: PropTypes.string,

    // order: {value}
    order: PropTypes.number,

    // position: {value}
    position: PropTypes.object,

    // overflow-x: {value}
    overflowX: PropTypes.object,

    // overflow-y: {value}
    overflowY: PropTypes.object,

    // padding-left: {value}
    gutterLeft: PropTypes.bool,

    // padding-right: {value}
    gutterRight: PropTypes.bool,

    // gutterLeft && gutterRight
    gutter: PropTypes.bool,

    // padding-top: {value}; padding-bottom: {value}
    inner: PropTypes.bool,

    // align-items: 'center'
    verticalCenter: PropTypes.bool,

    // justify-content: 'center'
    horizontalCenter: PropTypes.bool,

    // verticalCenter && horizontalCenter
    center: PropTypes.bool,

    // width: 100%
    fullWidth: PropTypes.bool,

    // height: 100%
    fullHeight: PropTypes.bool,

    // fullWidth && fullHeight
    full: PropTypes.bool
  }

  static defaultProps = {
    preset: 'base',
    style: {}
  }

  getStyles() {
    const props = this.props
    const {
      preset,
      style,
      theme
    } = props

    const propToStyle = R.converge((thisStyle, propValue) =>
        R.is(Function, thisStyle) ? thisStyle(propValue, theme) : thisStyle,
      [R.prop(R.__, styles), R.prop(R.__, props)]
    )

    return R.mergeAll([
      presets[preset],
      R.mergeAll(R.map(propToStyle, R.keys(props))),
      style
    ])
  }

  render() {
    return (
      <div style={this.getStyles()}>{this.props.children}</div>
    )
  }
}
