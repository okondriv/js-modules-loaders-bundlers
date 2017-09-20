"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (arr, iteratee) {
  var index = 0,
      length = arr.length,
      memo = arr[index];

  index += 1;
  for (; index < length; index += 1) {
    memo = iteratee(memo, arr[index]);
  }
  return memo;
};
//# sourceMappingURL=reduce-compiled.js.map