export default function (variables) {
  return {
    '.calculations-list__content': {
      overflow: 'auto',
      marginTop: `${- variables.gutters.small}px`
    },
    '.calculations-list__overlay': {
      position: 'absolute',
      zIndex: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'table-cell',
      width: '50%',
      height: '7.5vw',
      margin: 'auto',
      paddingLeft: `${variables.gutters.xlarge}px`,
      fontSize: '6vw',
      textAlign: 'center',
      color: variables.colors.fadedText,
      userSelect: 'none'
    },
    '.calculations-list__3r': {
      display: 'none',
    }
  }
}
