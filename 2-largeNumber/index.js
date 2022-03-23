
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/large-number-ccf.min.js')
} else {
  module.exports = require('./dist/large-number-ccf.js')
}
