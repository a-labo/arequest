/**
 * Create a custom request
 * @function create
 * @returns {function} - Request function
 */
'use strict'

const ARequest = require('./arequest')

/** @lends create */
function create (config) {
  let arequest = new ARequest(config)
  return arequest.bind()
}

module.exports = create
