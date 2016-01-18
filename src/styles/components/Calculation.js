export default function (variables) {
  return {
    '.calculation__output': {
      fontSize: variables.fontSizes.xlarge,
      color: variables.colors.accent
    },
    '.calculation__input': {
      fontSize: variables.fontSizes.small,
      marginTop: - variables.gutters.tiny
    },
    '.calculation__pointer': {
      textAlign: 'right',
      width: `${variables.gutters.xlarge}px`,
      cursor: 'pointer',
      color: variables.colors.fadedText,
      userSelect: 'none'
    },
    '.calculation__pointer span': {
      padding: `${variables.gutters.tiny}px`
    },
    '.calculation__pointer:hover': {
      color: variables.colors.text
    }
  }
}
