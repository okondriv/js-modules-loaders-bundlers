/* */ 
'use strict';
var rndm = require('rndm');
var uid = require('uid-safe');
var compare = require('tsscmp');
var crypto = require('crypto');
var EQUAL_GLOBAL_REGEXP = /=/g;
var PLUS_GLOBAL_REGEXP = /\+/g;
var SLASH_GLOBAL_REGEXP = /\//g;
module.exports = Tokens;
function Tokens(options) {
  if (!(this instanceof Tokens)) {
    return new Tokens(options);
  }
  var opts = options || {};
  var saltLength = opts.saltLength !== undefined ? opts.saltLength : 8;
  if (typeof saltLength !== 'number' || !isFinite(saltLength) || saltLength < 1) {
    throw new TypeError('option saltLength must be finite number > 1');
  }
  var secretLength = opts.secretLength !== undefined ? opts.secretLength : 18;
  if (typeof secretLength !== 'number' || !isFinite(secretLength) || secretLength < 1) {
    throw new TypeError('option secretLength must be finite number > 1');
  }
  this.saltLength = saltLength;
  this.secretLength = secretLength;
}
Tokens.prototype.create = function create(secret) {
  if (!secret || typeof secret !== 'string') {
    throw new TypeError('argument secret is required');
  }
  return this._tokenize(secret, rndm(this.saltLength));
};
Tokens.prototype.secret = function secret(callback) {
  return uid(this.secretLength, callback);
};
Tokens.prototype.secretSync = function secretSync() {
  return uid.sync(this.secretLength);
};
Tokens.prototype._tokenize = function tokenize(secret, salt) {
  return salt + '-' + hash(salt + '-' + secret);
};
Tokens.prototype.verify = function verify(secret, token) {
  if (!secret || typeof secret !== 'string') {
    return false;
  }
  if (!token || typeof token !== 'string') {
    return false;
  }
  var index = token.indexOf('-');
  if (index === -1) {
    return false;
  }
  var salt = token.substr(0, index);
  var expected = this._tokenize(secret, salt);
  return compare(token, expected);
};
function hash(str) {
  return crypto.createHash('sha1').update(str, 'ascii').digest('base64').replace(PLUS_GLOBAL_REGEXP, '-').replace(SLASH_GLOBAL_REGEXP, '_').replace(EQUAL_GLOBAL_REGEXP, '');
}
