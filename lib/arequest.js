/**
 * @class ARequest
 */
'use strict'

const argx = require('argx')
const co = require('co')
const request = require('request')
const parseResponseBody = require('./parsing/parse_response_body')

/** @lends ARequest */
class ARequest {
  constructor (config) {
    const s = this
    s.request = request.defaults(config || {})
  }

  /**
   * Send request
   * @param {string} [url] - URL to send
   * @param {Object} [options - Optional settings
   * @returns {Promise}
   */
  send (url, options) {
    const s = this
    let args = argx(arguments)
    url = args.shift('string')
    options = args.pop('object') || {}

    let config = Object.assign({ url }, options)
    let { request } = s
    return co(function * () {
      let connection
      let res = yield new Promise((resolve, reject) =>
        connection = request(config, (err, res, body) => {
          err ? reject(err) : resolve(Object.assign({}, res, { body }))
        })
      )
      let contentType = res.headers[ 'content-type' ]
      return Object.assign(res, {
        connection,
        body: parseResponseBody(res.body, contentType)
      })
    })
  }

  bind () {
    const s = this
    return s.send.bind(s)
  }
}

module.exports = ARequest
