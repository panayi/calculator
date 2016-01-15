import React, { Component, PropTypes } from 'react'
import R from 'ramda'
import Radium from 'radium'
import { propsChanged } from 'helpers/pureFunctions'
import layout from 'styles/layout/base'

const getGutterKey = R.compose(R.defaultTo('base'), R.find(R.is(String)), R.of)

const styles = {
  alignSelf: R.objOf('alignSelf'),
  boxSizing: R.objOf('boxSizing'),
  center: R.merge(
    R.objOf('alignItems', 'center'),
    R.objOf('justifyContent', 'center')
  ),
  flex: R.objOf('display', 'flex'),
  flexBasis: R.objOf('flexBasis'),
  full: R.merge(R.objOf('width', '100%'), R.objOf('height', '100%')),
  fullHeight: R.objOf('height', '100%'),
  fullWidth: R.objOf('width', '100%'),
  grow: R.objOf('flexGrow'),
  height: R.objOf('height'),
  horizontal: R.objOf('flexDirection', 'row'),
  horizontalReverse: R.objOf('flexDirection', 'row-reverse'),
  justifyContent: R.objOf('justifyContent'),
  maxHeight: R.objOf('maxHeight'),
  maxWidth: R.objOf('maxWidth'),
  nogrow: R.objOf('flexGrow', 0),
  nogutter: R.merge(R.objOf('paddingRight', 0), R.objOf('paddingLeft', 0)),
  noshrink: R.objOf('flexShrink', 0),
  nowrap: R.objOf('flexWrap', 'nowrap'),
  order: R.objOf('order'),
  overflowX: R.objOf('overflowX'),
  overflowY: R.objOf('overflowY'),
  position: R.objOf('position'),
  shrink: R.objOf('flexShrink'),
  vertical: R.objOf('flexDirection', 'column'),
  verticalReverse: R.objOf('flexDirection', 'column-reverse'),
  width: R.objOf('width'),
  wrap: R.objOf('flexWrap', 'wrap'),
  gutter: (value) => {
    const key = getGutterKey(value)
    return {
      paddingRight: `${layout.gutters[key]}px`,
      paddingLeft: `${layout.gutters[key]}px`
    }
  },
  gutterLeft: (value) => {
    const key = getGutterKey(value)
    return { paddingLeft: `${layout.gutters[key]}px` }
  },
  gutterRight: (value) => {
    const key = getGutterKey(value)
    return { paddingRight: `${layout.gutters[key]}px` }
  },
  inner: (value) => {
    const key = getGutterKey(value)
    return {
      paddingTop: `${layout.gutters[key]}px`,
      paddingBottom: `${layout.gutters[key]}px`
    }
  },
  innerMargin: (value) => {
    const key = getGutterKey(value)
    return {
      marginTop: `${layout.gutters[key]}px`,
      marginBottom: `${layout.gutters[key]}px`
    }
  }
}

const presets = {
  base: {},

  frame: R.mergeAll([
    styles.height('100vh'),
    styles.overflowX('hidden'),
    styles.overflowY('hidden'),
    styles.flex,
    styles.grow(1),
    styles.shrink(1),
    styles.flexBasis('auto'),
    styles.horizontal,
    styles.nowrap,
    styles.justifyContent('flex-start'),
    styles.order(0),
    styles.boxSizing('border-box'),
    styles.position('relative')
  ]),

  box: R.mergeAll([
    styles.height('auto'),
    styles.flex,
    styles.grow(1),
    styles.shrink(1),
    styles.flexBasis('auto'),
    styles.horizontal,
    styles.wrap,
    styles.justifyContent('flex-start'),
    styles.order(0),
    styles.boxSizing('border-box'),
    styles.position('relative'),
  ]),

  content: R.mergeAll([
    styles.grow(1),
    styles.shrink(1),
    styles.flexBasis('auto'),
    styles.boxSizing('border-box')
  ]),

  column: R.mergeAll([
    styles.grow(0),
    styles.shrink(0),
    styles.flexBasis('auto'),
    styles.boxSizing('border-box'),
    styles.gutter('tiny')
  ])
}

class Flex extends Component {
  static propTypes = {
    alignSelf: PropTypes.string,
    center: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    flex: PropTypes.bool,
    flexBasis: PropTypes.string,
    full: PropTypes.bool,
    fullHeight: PropTypes.bool,
    fullWidth: PropTypes.bool,
    grow: PropTypes.string,
    gutter: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    gutterLeft: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    gutterRight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    height: PropTypes.string,
    horizontal: PropTypes.bool,
    horizontalReverse: PropTypes.bool,
    inner: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    innerMargin: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    justifyContent: PropTypes.string,
    maxHeight: PropTypes.string,
    maxWidth: PropTypes.string,
    nogrow: PropTypes.bool,
    noshrink: PropTypes.bool,
    nowrap: PropTypes.bool,
    order: PropTypes.number,
    overflowX: PropTypes.object,
    overflowY: PropTypes.object,
    position: PropTypes.object,
    preset: PropTypes.oneOf(['frame', 'box', 'column', 'content']),
    shrink: PropTypes.string,
    style: PropTypes.object,
    vertical: PropTypes.bool,
    verticalReverse: PropTypes.bool,
    width: PropTypes.string,
    wrap: PropTypes.bool
  };

  static defaultProps = {
    preset: 'base',
    style: {}
  };

  shouldComponentUpdate(nextProps) {
    const { propTypes } = this.constructor
    return propsChanged(R.keys(propTypes), this.props, nextProps)
  }

  getStyles() {
    const {
      preset,
      style,
      ...props
    } = this.props

    const propToStyle = R.converge((thisStyle, propValue) =>
        R.is(Function, thisStyle) ? thisStyle(propValue) : thisStyle,
      [R.prop(R.__, styles), R.prop(R.__, props)]
    )

    return R.mergeAll([
      presets[preset],
      R.mergeAll(R.map(propToStyle, R.keys(props))),
      style
    ])
  }

  render() {
    const { className, children } = this.props
    return (
      <div className={className} style={this.getStyles()}>{children}</div>
    )
  }
}

export default Radium(Flex)
