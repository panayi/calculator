export default function (variables) {
  return {
    body: {
      fontFamily: variables.fontFamilies.text,
      fontSize: variables.fontSizes.base,
      backgroundColor: variables.colors.canvas,
      color: variables.colors.text
    },

    'h1, h2': {
      fontFamily: variables.fontFamilies.header,
      fontWeight: 'normal'
    },

    h1: {
      fontSize: variables.fontSizes.xlarge
    },

    h2: {
      fontSize: variables.fontSizes.large
    },

    a: {
      color: variables.colors.text,
      textDecoration: 'none'
    },

    'a:hover': {
      color: variables.colors.accent
    },

    small: {
      fontSize: variables.fontSizes.small
    }
  }
}
