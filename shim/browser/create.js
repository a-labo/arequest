/**
 * Create a custom request
 * @function create
 * @returns {function} - Request function
 */
'use strict';

var ARequest = require('./arequest');

/** @lends create */
function create(config) {
  var arequest = new ARequest(config);
  return arequest.bind();
}

module.exports = create;
//# sourceMappingURL=data:application/json;base64,bnVsbA==