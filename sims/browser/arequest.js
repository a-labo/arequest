/**
 * @class ARequest
 */
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var argx = require('argx');
var co = require('co');
var request = require('request');
var parseResponseBody = require('./parsing/parse_response_body');

/** @lends ARequest */

var ARequest = function () {
  function ARequest(config) {
    _classCallCheck(this, ARequest);

    var s = this;
    s.request = request.defaults(config || {});
  }

  /**
   * Send request
   * @param {string} [url] - URL to send
   * @param {Object} [options - Optional settings
   * @returns {Promise}
   */


  _createClass(ARequest, [{
    key: 'send',
    value: function send(url, options) {
      var s = this;
      var args = argx(arguments);
      url = args.shift('string');
      options = args.pop('object') || {};

      var config = Object.assign({ url: url }, options);
      var _options = options;
      var pipe = _options.pipe;

      delete options.pipe;
      var request = s.request;

      return co(regeneratorRuntime.mark(function _callee() {
        var res, contentType;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return new Promise(function (resolve, reject) {
                  var connection = request(config, function (err, res, body) {
                    err ? reject(err) : resolve(Object.assign({}, res, { body: body }));
                  });
                  if (pipe) {
                    connection.pipe(pipe);
                  }
                });

              case 2:
                res = _context.sent;
                contentType = res.headers['content-type'];
                return _context.abrupt('return', Object.assign(res, {
                  body: parseResponseBody(res.body, contentType)
                }));

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
    }
  }, {
    key: 'bind',
    value: function bind() {
      var s = this;
      return s.send.bind(s);
    }
  }]);

  return ARequest;
}();

module.exports = ARequest;