/* */ 
(function(Buffer) {
  'use strict';
  var randomBytes = require('random-bytes');
  var EQUAL_GLOBAL_REGEXP = /=/g;
  var PLUS_GLOBAL_REGEXP = /\+/g;
  var SLASH_GLOBAL_REGEXP = /\//g;
  module.exports = uid;
  module.exports.sync = uidSync;
  function uid(length, callback) {
    if (callback !== undefined && typeof callback !== 'function') {
      throw new TypeError('argument callback must be a function');
    }
    if (!callback && !global.Promise) {
      throw new TypeError('argument callback is required');
    }
    if (callback) {
      return generateUid(length, callback);
    }
    return new Promise(function executor(resolve, reject) {
      generateUid(length, function onUid(err, str) {
        if (err)
          return reject(err);
        resolve(str);
      });
    });
  }
  function uidSync(length) {
    return toString(randomBytes.sync(length));
  }
  function generateUid(length, callback) {
    randomBytes(length, function(err, buf) {
      if (err)
        return callback(err);
      callback(null, toString(buf));
    });
  }
  function toString(buf) {
    return buf.toString('base64').replace(PLUS_GLOBAL_REGEXP, '-').replace(SLASH_GLOBAL_REGEXP, '_').replace(EQUAL_GLOBAL_REGEXP, '');
  }
})(require('buffer').Buffer);
