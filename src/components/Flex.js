import React, { Component, PropTypes } from 'react'
import R from 'ramda'
import Radium from 'radium'

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
  gutter: (value, theme) => {
    const key = getGutterKey(value)
    return {
      paddingRight: `${theme.gutters[key]}px`,
      paddingLeft: `${theme.gutters[key]}px`
    }
  },
  gutterLeft: (value, theme) => {
    const key = getGutterKey(value)
    return { paddingLeft: `${theme.gutters[key]}px` }
  },
  gutterRight: (value, theme) => {
    const key = getGutterKey(value)
    return { paddingRight: `${theme.gutters[key]}px` }
  },
  inner: (value, theme) => {
    const key = getGutterKey(value)
    return {
      paddingTop: `${theme.gutters[key]}px`,
      paddingBottom: `${theme.gutters[key]}px`
    }
  },
  innerMargin: (value, theme) => {
    const key = getGutterKey(value)
    return {
      marginTop: `${theme.gutters[key]}px`,
      marginBottom: `${theme.gutters[key]}px`
    }
  }
}

const createPresets = (theme) => {
  return {
    base: {
    },

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
      styles.gutter('tiny', theme)
    ])
  }
}

class Flex extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
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

    // align-self: {value}
    alignSelf: PropTypes.string,

    // max-width: {value}
    maxWidth: PropTypes.string,

    // max-height: {value}
    maxHeight: PropTypes.string,

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

    // flex-grow: {value}
    grow: PropTypes.string,

    // flex-grow: 0
    nogrow: PropTypes.bool,

    // flex-shrink: {value}
    shrink: PropTypes.string,

    // flex-shrink: 0
    noshrink: PropTypes.bool,

    // flex-basis: {value}
    flexBasis: PropTypes.string,

    // justify-content: {value}
    justifyContent: PropTypes.string,

    // order: {value}
    order: PropTypes.number,

    // position: {value}
    position: PropTypes.object,

    // overflow-x: {value}
    overflowX: PropTypes.object,

    // overflow-y: {value}
    overflowY: PropTypes.object,

    // padding-left: theme.gutters[{value}]
    gutterLeft: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),

    // padding-right: theme.gutters[{value}]
    gutterRight: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),

    // gutterLeft && gutterRight
    gutter: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),

    // padding-top: theme.gutters[{value}]
    // padding-bottom: theme.gutters[{value}]
    inner: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),

    // margin-top: theme.gutters[{value}]
    // margin-bottom: theme.gutters[{value}]
    innerMargin: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),

    // align-items: center;
    // justify-content: center;
    center: PropTypes.bool,

    // width: 100%
    fullWidth: PropTypes.bool,

    // height: 100%
    fullHeight: PropTypes.bool,

    // fullWidth && fullHeight
    full: PropTypes.bool
  };

  static defaultProps = {
    preset: 'base',
    style: {}
  };

  getStyles() {
    const {
      preset,
      style,
      theme,
      ...props
    } = this.props
    const presets = createPresets(theme)

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

export default Radium(Flex)
