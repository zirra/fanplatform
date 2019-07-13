'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_API: '"http://localhost:4444"',
  // ROOT_API: '"https://socket.digitalseat.io"',
  SOCKET_SERVER: '"http://localhost:4444"',
  ASSETS: '"https://s3.us-east-2.amazonaws.com/ds-stadium-bucket/chiefs"'
})
