/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

module.exports = function isGlob(str) {
  return typeof str === 'string'
    && /[!*{}?(|)[\]]/.test(str);
};
