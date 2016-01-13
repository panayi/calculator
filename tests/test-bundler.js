// require all `tests/test-helpers/**/*.js`
const helpersContext = require.context('./test-helpers/', true, /\.js$/)
helpersContext.keys().forEach(helpersContext)

// require all `tests/**/*.spec.js`
const testsContext = require.context('./', true, /\.spec\.js$/)
testsContext.keys().forEach(testsContext)

// require all `src/**/*.js` except for `main.js` (for isparta reporting)
const componentsContext = require.context('../src/', true, /^((?!main).)*\.js$/)

componentsContext.keys().forEach(componentsContext)
