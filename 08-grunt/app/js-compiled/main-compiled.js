"use strict";

var _sum = require("./sum");

var _sum2 = _interopRequireDefault(_sum);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = Array.from(Array(100000).keys());
var answer = (0, _sum2.default)(values);

document.getElementById("answer").innerHTML = answer;
//# sourceMappingURL=main-compiled.js.map
