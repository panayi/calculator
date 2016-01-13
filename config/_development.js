// We use an explicit public path when the assets are served by webpack
// to fix this issue:
// http://stackoverflow.com/a/34133809/359104
export default (config) => ({
  compiler_public_path: `http://${config.server_host}:${config.server_port}/`
})
