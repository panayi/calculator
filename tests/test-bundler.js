// require all `tests/test-helpers/**/*.js`
const helpersContext = require.context('./test-helpers/', true, /\.js$/)
helpersContext.keys().forEach(helpersContext)

// require all `tests/**/*.spec.js`
const testsContext = require.context('./', true, /\.spec\.js$/)
testsContext.keys().forEach(testsContext)

// require all `src/**/*.js` except for `main.js` (for isparta reporting)
const componentsContext = require.context('../src/', true, /^((?!main).)*\.js$/)

componentsContext.keys().forEach(componentsContext)

// global.navigator = {userAgent: 'Mozilla/5.0 (Windows NT 6.1; WOW64)
// AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85 Safari/537.36'};
