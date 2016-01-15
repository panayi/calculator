export default function (variables) {
  return {
    '.calculate': {
      position: 'relative'
    },
    '.calculate__input': {
      background: 'none',
      border: 'none',
      boxShadow: 'none',
      outline: 'none',
      fontSize: '20px',
      padding: '16px 0 11px 0',
      width: '100%',
      color: variables.colors.accent
    },
    '.calculate__output': {
      position: 'absolute',
      fontSize: variables.fontSizes.small
    }
  }
}
