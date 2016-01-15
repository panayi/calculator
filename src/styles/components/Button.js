export default function (variables) {
  return {
    '.button': {
      fontSize: variables.fontSizes.button,
      width: '56.5px',
      margin: `0 ${variables.gutters.xsmall}px ${variables.gutters.xsmall}px 0`,
      padding: '1px 0',
      textAlign: 'center',
      display: 'inline-block',
      cursor: 'pointer',
      userSelect: 'none',
      borderBottom: `5px solid ${variables.colors.canvasDarker}`,
      backgroundColor: variables.colors.canvasDark
    },
    '.button--active': {
      color: variables.colors.accent,
      backgroundColor: variables.colors.canvasDarker
    }
  }
}
