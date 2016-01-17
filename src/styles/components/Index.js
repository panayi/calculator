export default function (variables) {
  return {
    '.index__margin': {
      position: 'absolute',
      left: `${variables.gutters.xlarge}px`,
      height: '100%',
      zIndex: 1,
      borderRight: `1px solid ${variables.colors.border}`
    },
    '.index__calculations': {
      overflow: 'auto',
      backgroundColor: variables.colors.canvasDark,
      borderRadius: '2px 2px 0 0'
    },
    '.index__author': {
      position: 'absolute',
      bottom: 0,
      right: 0,
      padding: '3px 9px 2px',
      backgroundColor: variables.colors.canvas,
      borderTopLeftRadius: '3px'
    },
    '.index__calculate-wrapper': {
      backgroundColor: variables.colors.canvasDark,
      borderBottom: `1px solid ${variables.colors.lightBorder}`,
      borderRadius: '0 0 2px 2px'
    },
    '.index__calculate': {
      width: `calc(100% - ${variables.gutters.xlarge}px)`
    }
  }
}
