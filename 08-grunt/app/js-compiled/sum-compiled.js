'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _add = require('./add');

var _reduce = require('./reduce');

var _reduce2 = _interopRequireDefault(_reduce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  return (0, _reduce2.default)(arr, _add.add);
};
//# sourceMappingURL=sum-compiled.js.map
