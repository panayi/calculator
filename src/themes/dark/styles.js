export default function (variables) {
  return {
    body: {
      fontFamily: variables.fontFamily,
      fontSize: variables.fontSizes.base,
      backgroundColor: variables.colors.canvas,
      color: variables.colors.text
    }
  }
}
