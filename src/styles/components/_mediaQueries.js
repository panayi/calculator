export default function (variables) {
  return {
    mediaQueries: {
      [variables.screens.mediumWidth]: {
        '.author__name': {
          display: 'none !important'
        }
      },

      [variables.screens.smallWidth]: {
        '.app__sidebar': {
          display: 'none !important'
        },
        '.calculations-list__3r': {
          display: 'inline !important'
        }
      },

      [variables.screens.mediumHeight]: {
        '.index-sidebar__logo': {
          fontSize: '28vh !important',
          lineHeight: '22vh !important'
        }
      },

      [variables.screens.smallHeight]: {
        '.index-sidebar__logo': {
          display: 'none !important'
        }
      }
    }
  }
}
