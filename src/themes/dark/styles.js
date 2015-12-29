export default function (variables) {
  return {
    body: {
      fontFamily: variables.fontFamily,
      fontSize: variables.fontSizes.base,
      backgroundColor: variables.colors.canvas,
      color: variables.colors.text
    },

    a: {
      color: variables.colors.text
    },

    h1: {
      fontSize: variables.fontSizes.xlarge
    },

    h2: {
      fontSize: variables.fontSizes.large
    },

    small: {
      fontSize: variables.fontSizes.small
    }
  }
}
