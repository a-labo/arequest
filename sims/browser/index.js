/**
 * Promise base request module
 * @module arequest
 */

'use strict';

var create = require('./create');
var ARequest = require('./arequest');

var lib = create({});

Object.assign(lib, {
  create: create,
  ARequest: ARequest
});

module.exports = lib;