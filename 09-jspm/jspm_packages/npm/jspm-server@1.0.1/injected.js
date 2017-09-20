/* */ 
"format cjs";
(function(process) {
  (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a)
            return a(o, !0);
          if (i)
            return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }
        var l = n[o] = {exports: {}};
        t[o][0].call(l.exports, function(e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)
      s(r[o]);
    return s;
  })({
    1: [function(require, module, exports) {
      'use strict';
      require('./lib/index');
    }, {"./lib": 3}],
    2: [function(require, module, exports) {
      'use strict';
      var _interopRequireWildcard = function(obj) {
        return obj && obj.__esModule ? obj : {'default': obj};
      };
      var _slicedToArray = function(arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = undefined;
          try {
            for (var _i = arr[Symbol.iterator](),
                _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i)
                break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i['return'])
                _i['return']();
            } finally {
              if (_d)
                throw _e;
            }
          }
          return _arr;
        } else {
          throw new TypeError('Invalid attempt to destructure non-iterable instance');
        }
      };
      var _classCallCheck = function(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError('Cannot call a class as a function');
        }
      };
      var _createClass = (function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ('value' in descriptor)
              descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
          if (staticProps)
            defineProperties(Constructor, staticProps);
          return Constructor;
        };
      })();
      Object.defineProperty(exports, '__esModule', {value: true});
      var _ModuleDiffer = require('./module-differ');
      var _ModuleDiffer2 = _interopRequireWildcard(_ModuleDiffer);
      var _url = require('url');
      var _url2 = _interopRequireWildcard(_url);
      var ChangeHandler = (function() {
        function ChangeHandler(System, responder) {
          _classCallCheck(this, ChangeHandler);
          this.System = System;
          this.responder = responder;
          this.moduleMap = new Map();
          this.depMap = new Map();
          this.updateModuleMap();
          this.updateDepMap();
        }
        _createClass(ChangeHandler, [{
          key: 'updateModuleMap',
          value: function updateModuleMap() {
            var _this = this;
            var modules = Object.keys(this.System.loads || {});
            if (modules.length != this.moduleMap.size) {
              this.moduleMap.clear();
              modules.forEach(function(moduleName) {
                var meta = _this.System.loads[moduleName].metadata,
                    path = _this.System.loads[moduleName].address || meta.pluginArgument || meta.loaderArgument || moduleName;
                _this.moduleMap.set(path, {
                  moduleName: moduleName,
                  loader: meta.plugin || meta.loaderModule
                });
              });
            }
          }
        }, {
          key: 'updateDepMap',
          value: function updateDepMap() {
            var _this2 = this;
            var modules = Object.keys(this.System.loads || {});
            if (modules.length != this.depMap.size) {
              this.depMap.clear();
              modules.forEach(function(m) {
                var meta = _this2.System.loads[m].metadata,
                    path = meta.pluginArgument || meta.loaderArgument || m;
                _this2.depMap.set(path, []);
              });
              modules.forEach(function(m) {
                var deps = _this2.System.loads[m].depMap;
                Object.keys(deps).forEach(function(dep) {
                  var _deps$dep$split = deps[dep].split('!');
                  var _deps$dep$split2 = _slicedToArray(_deps$dep$split, 2);
                  var path = _deps$dep$split2[0];
                  var loader = _deps$dep$split2[1];
                  var map = _this2.depMap.get(path);
                  if (map)
                    map.push(m.split('!')[0]);
                });
              });
            }
          }
        }, {
          key: 'fileChanged',
          value: function fileChanged(_path) {
            var _this3 = this;
            this.System.normalize(_path).then(function(path) {
              _this3.updateModuleMap();
              _this3.updateDepMap();
              window.moduleMap = _this3.moduleMap;
              window.depMap = _this3.depMap;
              if (!_this3.moduleMap.has(path)) {
                if (_this3.moduleMap.has(path.replace(/.js$/, ''))) {
                  path = path.replace(/.js$/, '');
                } else {
                  _this3.reload(path, 'Change occurred to a file outside SystemJS loading');
                  return;
                }
              }
              var moduleInfo = _this3.moduleMap.get(path);
              return _this3.System['import'](moduleInfo.moduleName).then(function(oldModule) {
                if (!oldModule.__hotReload) {
                  return Promise.reject('' + path + ' is not hot reloadable!');
                }
                var loader = moduleInfo.loader && (moduleInfo.loader['default'] || moduleInfo.loader);
                _this3.System['delete'](moduleInfo.moduleName);
                _this3.System['import'](moduleInfo.moduleName).then(function(newModule) {
                  _this3.responder({
                    type: 'good',
                    message: '🔁  Reloaded ' + path
                  });
                  var propagateIfNeeded = undefined;
                  if (oldModule.__hotReload === true) {
                    propagateIfNeeded = true;
                  } else if (typeof oldModule.__hotReload === 'function') {
                    propagateIfNeeded = oldModule.__hotReload.call(oldModule, loader, newModule);
                  }
                  if (propagateIfNeeded && !_ModuleDiffer2['default'].shallowEqual(oldModule, newModule)) {
                    var deps = _this3.depMap.get(path);
                    if (deps)
                      deps.forEach(function(dep) {
                        return _this3.fileChanged(dep);
                      });
                  }
                });
              })['catch'](function(reason) {
                return _this3.reload(path, reason);
              });
            });
          }
        }, {
          key: 'reload',
          value: function reload(path, reason) {
            this.responder({
              type: 'bad',
              message: '💥  Change to ' + path + ' cannot be handled gracefully:\n👉  ' + reason
            });
          }
        }]);
        return ChangeHandler;
      })();
      exports['default'] = ChangeHandler;
      module.exports = exports['default'];
    }, {
      "./module-differ": 5,
      "url": 27
    }],
    3: [function(require, module, exports) {
      'use strict';
      var _interopRequireWildcard = function(obj) {
        return obj && obj.__esModule ? obj : {'default': obj};
      };
      var _messageHandler = require('./message-handler');
      var _messageHandler2 = _interopRequireWildcard(_messageHandler);
      var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
      var address = protocol + window.location.host + window.location.pathname + '/ws';
      var socket = new WebSocket(address);
      socket.onmessage = function(msg) {
        var data = undefined;
        try {
          data = JSON.parse(msg.data);
        } catch (e) {
          console.error('Non-JSON response received: ' + JSON.stringify(msg));
          throw e;
        }
        _messageHandler2['default'](data, function(response) {
          console[response.type === 'good' ? 'log' : 'warn'](response.message);
          socket.send(JSON.stringify(response));
        });
      };
    }, {"./message-handler": 4}],
    4: [function(require, module, exports) {
      "use strict";
      var _interopRequireWildcard = function(obj) {
        return obj && obj.__esModule ? obj : {"default": obj};
      };
      Object.defineProperty(exports, "__esModule", {value: true});
      var _ChangeHandler = require('./change-handler');
      var _ChangeHandler2 = _interopRequireWildcard(_ChangeHandler);
      var changeHandler = undefined;
      exports["default"] = function(message, responder) {
        if (message.type == "connected") {
          responder({
            type: "good",
            message: "🤘  Client connected. JSPM watching enabled"
          });
        } else if (message.type == "change") {
          if (!changeHandler && window.System && window.System._loader && window.System._loader.loads) {
            responder({
              type: "good",
              message: "✅  SystemJS loaded. Initialising ChangeHandler"
            });
            changeHandler = new _ChangeHandler2["default"](window.System, responder);
          }
          if (changeHandler) {
            changeHandler.fileChanged(message.path);
          } else {
            responder({
              type: "bad",
              message: "💥  SystemJS not yet loaded. Ignoring change."
            });
          }
        } else {
          console.error("Unknown message type! " + JSON.stringify(message));
        }
      };
      module.exports = exports["default"];
    }, {"./change-handler": 2}],
    5: [function(require, module, exports) {
      "use strict";
      var _interopRequireWildcard = function(obj) {
        return obj && obj.__esModule ? obj : {"default": obj};
      };
      var _slicedToArray = function(arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          var _arr = [];
          var _n = true;
          var _d = false;
          var _e = undefined;
          try {
            for (var _i = arr[Symbol.iterator](),
                _s; !(_n = (_s = _i.next()).done); _n = true) {
              _arr.push(_s.value);
              if (i && _arr.length === i)
                break;
            }
          } catch (err) {
            _d = true;
            _e = err;
          } finally {
            try {
              if (!_n && _i["return"])
                _i["return"]();
            } finally {
              if (_d)
                throw _e;
            }
          }
          return _arr;
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
      Object.defineProperty(exports, "__esModule", {value: true});
      var _F = require('fkit');
      var _F2 = _interopRequireWildcard(_F);
      var notChecked = function notChecked(pair) {
        return !(pair[0] == "default" && typeof pair[1] === "object" || /^__/.exec(pair[0]));
      },
          getPairs = function getPairs(module) {
            var pairs = _F2["default"].filter(notChecked, _F2["default"].pairs(module));
            if (typeof module["default"] === "object") {
              return pairs.concat(_F2["default"].pairs(module["default"]));
            } else {
              return pairs;
            }
          },
          pairsEqual = function pairsEqual(pairs) {
            var _pairs = _slicedToArray(pairs, 2);
            var pairA = _pairs[0];
            var pairB = _pairs[1];
            return pairA[0] === pairB[0] && pairA[1] === pairB[1];
          };
      exports["default"] = {shallowEqual: function shallowEqual(moduleA, moduleB) {
          var a = getPairs(moduleA),
              b = getPairs(moduleB);
          return a.length == b.length && _F2["default"].all(pairsEqual, _F2["default"].zip(a, b));
        }};
      module.exports = exports["default"];
    }, {"fkit": 6}],
    6: [function(require, module, exports) {
      'use strict';
      var util = require('./util');
      module.exports = util.extend({}, [require('./fn'), require('./list'), require('./logic'), require('./math'), require('./obj'), require('./string')]);
    }, {
      "./fn": 7,
      "./list": 8,
      "./logic": 18,
      "./math": 19,
      "./obj": 20,
      "./string": 21,
      "./util": 22
    }],
    7: [function(require, module, exports) {
      'use strict';
      var util = require('./util');
      function flatten(as) {
        return as.reduce(function(a, b) {
          return a.concat(b);
        }, []);
      }
      function curry(f) {
        var arity = f.length;
        return (arity <= 1) ? f : given([], 0);
        function given(args, applications) {
          return function() {
            var newArgs = args.concat((arguments.length > 0) ? util.slice.call(arguments, 0) : undefined);
            return (newArgs.length >= arity) ? f.apply(this, newArgs) : given(newArgs, applications + 1);
          };
        }
      }
      function variadic(f) {
        var arity = f.length;
        if (arity < 1) {
          return f;
        } else if (arity === 1) {
          return function() {
            var args = util.slice.call(arguments, 0),
                newArgs = (arguments.length === 1) ? flatten(args) : args;
            return f.call(this, newArgs);
          };
        } else {
          return function() {
            var numMissingArgs = Math.max(arity - arguments.length - 1, 0),
                missingArgs = new Array(numMissingArgs),
                namedArgs = util.slice.call(arguments, 0, arity - 1),
                variadicArgs = util.slice.call(arguments, f.length - 1);
            return f.apply(this, namedArgs.concat(missingArgs).concat([variadicArgs]));
          };
        }
      }
      var self;
      self = module.exports = {
        flatten: flatten,
        apply: curry(function(f, a) {
          return f(a);
        }),
        apply2: curry(function(f, a, b) {
          return f(a, b);
        }),
        apply3: curry(function(f, a, b, c) {
          return f(a, b, c);
        }),
        applyRight: curry(function(a, f) {
          return f(a);
        }),
        compose: variadic(function(fs) {
          return function(a) {
            return fs.reduceRight(function(a, f) {
              return f(a);
            }, a);
          };
        }),
        flip: curry(function(f, a, b) {
          return f(b, a);
        }),
        id: function(a) {
          return a;
        },
        const: function(c) {
          return function() {
            return c;
          };
        },
        curry: curry,
        uncurry: curry(function(f, p) {
          return f(p[0], p[1]);
        }),
        unary: function(f) {
          return (f.length === 1) ? f : self.apply(f);
        },
        binary: function(f) {
          return (f.length === 2) ? f : self.apply2(f);
        },
        variadic: variadic,
        tap: curry(function(f, a) {
          f(a);
          return a;
        }),
        equal: curry(function(a, b) {
          return b === a;
        }),
        notEqual: curry(function(a, b) {
          return b !== a;
        }),
        compare: curry(function(a, b) {
          if (a > b) {
            return 1;
          } else if (a < b) {
            return -1;
          } else {
            return 0;
          }
        })
      };
    }, {"./util": 22}],
    8: [function(require, module, exports) {
      'use strict';
      var util = require('./util');
      module.exports = util.extend({}, [require('./list/base'), require('./list/build'), require('./list/fold'), require('./list/map'), require('./list/search'), require('./list/set'), require('./list/sort'), require('./list/sublist'), require('./list/zip')]);
    }, {
      "./list/base": 9,
      "./list/build": 10,
      "./list/fold": 11,
      "./list/map": 12,
      "./list/search": 13,
      "./list/set": 14,
      "./list/sort": 15,
      "./list/sublist": 16,
      "./list/zip": 17,
      "./util": 22
    }],
    9: [function(require, module, exports) {
      'use strict';
      var fn = require('../fn');
      var self;
      self = module.exports = {
        isString: function(as) {
          return (typeof as === 'string');
        },
        isArrayOfStrings: function(as) {
          return Array.isArray(as) && as.length > 0 && as.reduce(function(a, b) {
            return a && self.isString(b);
          }, true);
        },
        mempty: function(as) {
          return self.isString(as) || self.isArrayOfStrings(as) ? '' : [];
        },
        pure: function(a) {
          return self.isString(a) || self.isArrayOfStrings(a) ? a : [a];
        },
        toArray: function(as) {
          return self.isString(as) ? as.split('') : as;
        },
        toList: function(as, t) {
          return t === 'string' ? as.join('') : as;
        },
        length: function(as) {
          return as.length;
        },
        empty: function(as) {
          return as.length === 0;
        },
        append: fn.curry(function(a, bs) {
          return self.isString(bs) ? (bs + a) : bs.concat([a]);
        }),
        prepend: fn.curry(function(a, bs) {
          return self.isString(bs) ? (a + bs) : [a].concat(bs);
        }),
        surround: fn.curry(function(a, b, cs) {
          return self.append(b, self.prepend(a, cs));
        }),
        head: function(as) {
          return as[0];
        },
        last: function(as) {
          return as[as.length - 1];
        },
        init: function(as) {
          return as.slice(0, as.length - 1);
        },
        tail: function(as) {
          return as.slice(1);
        },
        inits: function inits(as) {
          return self.prepend(self.mempty(as), self.empty(as) ? [] : inits(self.tail(as)).map(self.prepend(self.head(as))));
        },
        tails: function tails(as) {
          return self.prepend(as, self.empty(as) ? [] : tails(self.tail(as)));
        }
      };
    }, {"../fn": 7}],
    10: [function(require, module, exports) {
      'use strict';
      var base = require('./base'),
          fn = require('../fn'),
          fold = require('./fold'),
          math = require('../math'),
          sublist = require('./sublist');
      var self;
      self = module.exports = {
        array: function(n) {
          return Array.apply(null, Array(n));
        },
        string: function(n) {
          return self.array(n + 1).join(' ');
        },
        pair: fn.curry(function(a, b) {
          return [a, b];
        }),
        range: fn.curry(function(a, n) {
          return self.array(n).map(function(_, i) {
            return a + i;
          });
        }),
        replicate: fn.curry(function(n, a) {
          var as = base.isString(a) ? self.string(n) : self.array(n);
          return fold.concatMap(function() {
            return [a];
          }, as);
        }),
        sample: fn.curry(function(n, as) {
          return sublist.take(n, self.shuffle(as));
        }),
        shuffle: function(as) {
          var i = -1,
              r = self.array(as.length),
              bs = fold.fold(f, r, as),
              s = base.isString(as) ? '' : [];
          return fold.concatWith(s, bs);
          function f(b, a) {
            var j = math.randomInt(0, ++i);
            b[i] = b[j];
            b[j] = a;
            return b;
          }
        }
      };
    }, {
      "../fn": 7,
      "../math": 19,
      "./base": 9,
      "./fold": 11,
      "./sublist": 16
    }],
    11: [function(require, module, exports) {
      'use strict';
      var base = require('./base'),
          fn = require('../fn'),
          math = require('../math');
      var self;
      self = module.exports = {
        flattenStrings: function flattenStrings(as) {
          if (base.isArrayOfStrings(as)) {
            return self.concat(as);
          } else {
            if (Array.isArray(as)) {
              return as.map(flattenStrings);
            } else {
              return as;
            }
          }
        },
        concatWith: fn.curry(function(s, as) {
          return base.toArray(fn.flatten(as)).reduce(fn.flip(base.append), s);
        }),
        concat: fn.variadic(function(as) {
          return self.concatWith(base.mempty(as), as);
        }),
        concatMap: fn.curry(function(f, as) {
          var bs = base.toArray(as).map(fn.compose(self.flattenStrings, f)),
              cs = bs.length > 0 ? bs : as;
          return self.concatWith(base.mempty(cs), bs);
        }),
        fold: fn.curry(function(f, s, as) {
          return base.toArray(as).reduce(f, s);
        }),
        foldRight: fn.curry(function(f, s, as) {
          return base.toArray(as).reduceRight(fn.flip(f), s);
        }),
        scan: fn.curry(function(f, s, as) {
          var r = [s];
          self.fold(function(b, a) {
            return fn.tap(r.push.bind(r), f(b, a));
          }, s, as);
          return r;
        }),
        scanRight: fn.curry(function(f, s, as) {
          var r = [s];
          self.foldRight(function(a, b) {
            return fn.tap(r.unshift.bind(r), f(a, b));
          }, s, as);
          return r;
        }),
        maximum: function(as) {
          return self.fold(math.max, as[0], as);
        },
        minimum: function(as) {
          return self.fold(math.min, as[0], as);
        },
        maximumBy: fn.curry(function(c, as) {
          return self.fold(function(a, b) {
            return c(a, b) > 0 ? a : b;
          }, as[0], as);
        }),
        minimumBy: fn.curry(function(c, as) {
          return self.fold(function(a, b) {
            return c(a, b) < 0 ? a : b;
          }, as[0], as);
        }),
        sum: function(as) {
          return self.fold(math.add, 0, as);
        },
        product: function(as) {
          return self.fold(math.mul, 1, as);
        }
      };
    }, {
      "../fn": 7,
      "../math": 19,
      "./base": 9
    }],
    12: [function(require, module, exports) {
      'use strict';
      var base = require('./base'),
          fn = require('../fn'),
          fold = require('./fold');
      module.exports = {
        map: fn.curry(function(f, as) {
          return base.toArray(as).map(f);
        }),
        reverse: function(as) {
          return base.toArray(as).reduce(fn.flip(base.prepend), base.mempty(as));
        },
        intersperse: fn.curry(function(s, as) {
          return base.empty(as) ? base.mempty(as) : fold.concat(base.head(as), prependToAll(base.tail(as)));
          function prependToAll(bs) {
            return base.empty(bs) ? base.mempty(bs) : fold.concat(s, base.head(bs), prependToAll(base.tail(bs)));
          }
        })
      };
    }, {
      "../fn": 7,
      "./base": 9,
      "./fold": 11
    }],
    13: [function(require, module, exports) {
      'use strict';
      var base = require('./base'),
          fn = require('../fn'),
          fold = require('./fold'),
          logic = require('../logic'),
          map = require('./map');
      var self;
      self = module.exports = {
        elem: fn.curry(function(a, as) {
          return as.indexOf(a) >= 0;
        }),
        elemIndex: fn.curry(function(a, as) {
          var i = as.indexOf(a);
          return (i >= 0) ? i : undefined;
        }),
        elemIndices: fn.curry(function(a, as) {
          return self.findIndices(fn.equal(a), as);
        }),
        find: fn.curry(function(p, as) {
          return base.head(self.filter(p, as));
        }),
        findIndex: fn.curry(function(p, as) {
          var n = as.length;
          for (var i = 0; i < n; i++) {
            if (p(as[i])) {
              return i;
            }
          }
          return undefined;
        }),
        findIndices: fn.curry(function(p, as) {
          var s = [],
              n = as.length;
          for (var i = 0; i < n; i++) {
            if (p(as[i])) {
              s.push(i);
            }
          }
          return s;
        }),
        filter: fn.curry(function(p, as) {
          var f = logic.branch(p, fn.id, fn.const(''));
          return base.isString(as) ? fold.concatMap(f, as) : as.filter(p);
        }),
        partition: fn.curry(function(p, as) {
          return [self.filter(p, as), self.filter(fn.compose(logic.not, p), as)];
        }),
        all: fn.curry(function(p, as) {
          return self.filter(p, as).length === as.length;
        }),
        any: fn.curry(function(p, as) {
          return self.filter(p, as).length > 0;
        }),
        isPrefixOf: fn.curry(function isPrefixOf(as, bs) {
          if (base.empty(as)) {
            return true;
          } else if (base.empty(bs)) {
            return false;
          } else {
            return base.head(as) === base.head(bs) && isPrefixOf(base.tail(as), base.tail(bs));
          }
        }),
        isSuffixOf: fn.curry(function(as, bs) {
          return self.isPrefixOf(map.reverse(as), map.reverse(bs));
        }),
        isInfixOf: fn.curry(function(as, bs) {
          return self.any(self.isPrefixOf(as), base.tails(bs));
        })
      };
    }, {
      "../fn": 7,
      "../logic": 18,
      "./base": 9,
      "./fold": 11,
      "./map": 12
    }],
    14: [function(require, module, exports) {
      'use strict';
      var base = require('./base'),
          build = require('./build'),
          fn = require('../fn'),
          fold = require('./fold'),
          map = require('./map'),
          search = require('./search');
      var self;
      self = module.exports = {
        nub: function(as) {
          return self.nubBy(fn.equal, as);
        },
        nubBy: fn.curry(function nubBy(f, as) {
          var a = base.head(as);
          return base.empty(as) ? base.mempty(as) : base.prepend(a, nubBy(f, search.filter(function(b) {
            return !f(a, b);
          }, base.tail(as))));
        }),
        union: fn.curry(function(as, bs) {
          return fold.fold(function(cs, b) {
            return (search.elem(b, cs)) ? cs : base.append(b, cs);
          }, as, bs);
        }),
        intersect: fn.curry(function(as, bs) {
          return fold.fold(function(cs, a) {
            return (search.elem(a, bs)) ? base.append(a, cs) : cs;
          }, base.mempty(as), as);
        }),
        difference: fn.curry(function(as, bs) {
          return fold.fold(fn.flip(self.remove), as, bs);
        }),
        remove: fn.curry(function(a, bs) {
          return self.removeBy(fn.equal, a, bs);
        }),
        removeBy: fn.curry(function removeBy(f, a, bs_) {
          var b = base.head(bs_),
              bs = base.tail(bs_);
          return base.empty(bs_) ? base.mempty(bs_) : f(a, b) ? bs : base.prepend(b, removeBy(f, a, bs));
        }),
        cartesian: fn.curry(function cartesian(as, bs) {
          return base.empty(as) ? [] : fold.concat(map.map(build.pair(base.head(as)), bs), cartesian(base.tail(as), bs));
        }),
        subsequences: function(as) {
          return base.prepend(base.mempty(as), subsequences_(as));
          function subsequences_(bs) {
            var b = base.head(bs);
            if (base.empty(bs)) {
              return [];
            } else {
              return base.prepend(base.pure(b), fold.foldRight(f, [], subsequences_(base.tail(bs))));
            }
            function f(ys, r) {
              return fold.concat(base.pure(ys), base.pure(base.prepend(b, ys)), r);
            }
          }
        },
        permutations: function permutations(as) {
          return base.prepend(as, permutations_(as, []));
          function permutations_(bs_, cs) {
            var b = base.head(bs_),
                bs = base.tail(bs_);
            return base.empty(bs_) ? [] : fold.foldRight(interleave, permutations_(bs, base.prepend(b, cs)), permutations(cs));
            function interleave(ds, r) {
              return interleave_(fn.id, ds)[1];
              function interleave_(f, es_) {
                if (base.empty(es_)) {
                  return [bs, r];
                } else {
                  var e = base.head(es_),
                      es = base.tail(es_),
                      s = interleave_(fn.compose(f, base.prepend(e)), es);
                  return [base.prepend(e, s[0]), base.prepend(f(fold.concat(b, e, s[0])), s[1])];
                }
              }
            }
          }
        }
      };
    }, {
      "../fn": 7,
      "./base": 9,
      "./build": 10,
      "./fold": 11,
      "./map": 12,
      "./search": 13
    }],
    15: [function(require, module, exports) {
      'use strict';
      var base = require('./base'),
          fn = require('../fn'),
          util = require('../util');
      var self;
      self = module.exports = {
        sort: function(as) {
          return self.sortBy(fn.compare, as);
        },
        sortBy: fn.curry(function(c, as) {
          var bs = base.toArray(as.slice(0));
          return base.toList(bs.sort(c), typeof as);
        })
      };
    }, {
      "../fn": 7,
      "../util": 22,
      "./base": 9
    }],
    16: [function(require, module, exports) {
      'use strict';
      var base = require('./base'),
          fn = require('../fn'),
          fold = require('./fold');
      var self;
      self = module.exports = {
        take: fn.curry(function(n, as) {
          var s = base.isString(as) ? '' : [],
              m = as.length;
          for (var i = 0; i < Math.min(m, n); i++) {
            s = s.concat(as[i]);
          }
          return s;
        }),
        drop: fn.curry(function(n, as) {
          var s = base.isString(as) ? '' : [],
              m = as.length;
          for (var i = n; i < m; i++) {
            s = s.concat(as[i]);
          }
          return s;
        }),
        takeWhile: fn.curry(function(p, as) {
          var s = base.isString(as) ? '' : [],
              n = as.length;
          for (var i = 0; i < n && p(as[i]); i++) {
            s = s.concat(as[i]);
          }
          return s;
        }),
        dropWhile: fn.curry(function(p, as) {
          var s = base.isString(as) ? '' : [],
              m = as.length,
              n = 0;
          while (p(as[n]) && n < as.length) {
            n++;
          }
          for (var i = n; i < m; i++) {
            s = s.concat(as[i]);
          }
          return s;
        }),
        splitAt: fn.curry(function(n, as) {
          return [self.take(n, as), self.drop(n, as)];
        }),
        span: fn.curry(function(p, as) {
          return [self.takeWhile(p, as), self.dropWhile(p, as)];
        }),
        group: function(as) {
          return self.groupBy(fn.equal, as);
        },
        groupBy: fn.curry(function groupBy(f, as) {
          var b = base.head(as),
              bs = self.span(f(b), base.tail(as));
          return base.empty(as) ? [] : base.prepend(base.prepend(b, base.head(bs)), groupBy(f, base.last(bs)));
        })
      };
    }, {
      "../fn": 7,
      "./base": 9,
      "./fold": 11
    }],
    17: [function(require, module, exports) {
      'use strict';
      var base = require('./base'),
          build = require('./build'),
          fn = require('../fn');
      var self;
      self = module.exports = {
        zipWith: fn.curry(function(f, as, bs) {
          var n = Math.min(as.length, bs.length);
          return base.toArray(as.slice(0, n)).map(function(a, i) {
            return f(a, bs[i]);
          });
        }),
        zip: fn.curry(function(as, bs) {
          return self.zipWith(build.pair, as, bs);
        }),
        unzip: function(as) {
          var s = base.mempty(as[0]);
          return as.reduceRight(function(p, ps) {
            var a = ps[0],
                b = ps[1],
                as = p[0],
                bs = p[1];
            return [base.prepend(a, as), base.prepend(b, bs)];
          }, [s, s]);
        }
      };
    }, {
      "../fn": 7,
      "./base": 9,
      "./build": 10
    }],
    18: [function(require, module, exports) {
      'use strict';
      var fn = require('./fn'),
          map = require('./list/map');
      var self;
      self = module.exports = {
        and: fn.curry(function(a, b) {
          return b && a;
        }),
        or: fn.curry(function(a, b) {
          return b || a;
        }),
        not: function(a) {
          return !a;
        },
        branch: fn.curry(function(p, f, g, a) {
          return p(a) ? f(a) : g(a);
        }),
        whereAll: fn.curry(function(ps, a) {
          return ps.map(fn.applyRight(a)).reduce(self.and, true);
        }),
        whereAny: fn.curry(function(ps, a) {
          return ps.map(fn.applyRight(a)).reduce(self.or, false);
        })
      };
    }, {
      "./fn": 7,
      "./list/map": 12
    }],
    19: [function(require, module, exports) {
      'use strict';
      var fn = require('./fn');
      module.exports = {
        add: fn.curry(function(a, b) {
          return b + a;
        }),
        sub: fn.curry(function(a, b) {
          return b - a;
        }),
        mul: fn.curry(function(a, b) {
          return b * a;
        }),
        div: fn.curry(function(a, b) {
          return b / a;
        }),
        mod: fn.curry(function(a, b) {
          return b % a;
        }),
        max: fn.curry(function(a, b) {
          return b > a ? b : a;
        }),
        min: fn.curry(function(a, b) {
          return a > b ? b : a;
        }),
        negate: function(a) {
          return -a;
        },
        eq: fn.curry(function(a, b) {
          return b == a;
        }),
        neq: fn.curry(function(a, b) {
          return b != a;
        }),
        gt: fn.curry(function(a, b) {
          return b > a;
        }),
        gte: fn.curry(function(a, b) {
          return b >= a;
        }),
        lt: fn.curry(function(a, b) {
          return b < a;
        }),
        lte: fn.curry(function(a, b) {
          return b <= a;
        }),
        inc: function(a) {
          return a + 1;
        },
        dec: function(a) {
          return a - 1;
        },
        randomInt: fn.curry(function(a, b) {
          return Math.floor(Math.random() * (b - a + 1)) + a;
        }),
        randomFloat: fn.curry(function(a, b) {
          return (Math.random() * (b - a)) + a;
        })
      };
    }, {"./fn": 7}],
    20: [function(require, module, exports) {
      'use strict';
      var fn = require('./fn'),
          set = require('./list/set'),
          util = require('./util');
      var self;
      self = module.exports = {
        applyMethod: fn.curry(function(k, a, o) {
          return o[k](a);
        }),
        applyMethod2: fn.curry(function(k, a, b, o) {
          return o[k](a, b);
        }),
        applyMethod3: fn.curry(function(k, a, b, c, o) {
          return o[k](a, b, c);
        }),
        copy: fn.variadic(function(o, ps) {
          return util.extend(new o.constructor(), [o].concat(ps));
        }),
        get: fn.curry(function(k, o) {
          return o[k];
        }),
        getIn: fn.curry(function(ks, o) {
          return ks.reduce(function(a, b) {
            return (a !== undefined) ? a[b] : undefined;
          }, o);
        }),
        set: fn.curry(function(k, v, o) {
          var p = {};
          p[k] = v;
          return self.copy(o, p);
        }),
        update: fn.curry(function(k, f, o) {
          return self.set(k, f(self.get(k, o)), o);
        }),
        pick: fn.curry(function(ks, o) {
          return ks.reduce(function(p, k) {
            return self.set(k, self.get(k, o), p);
          }, {});
        }),
        omit: fn.curry(function(ks, o) {
          return set.difference(self.keys(o), ks).reduce(function(p, k) {
            return self.set(k, self.get(k, o), p);
          }, {});
        }),
        pairs: function(o) {
          return Object.keys(o).map(function(k) {
            return [k, self.get(k, o)];
          });
        },
        keys: function(o) {
          return Object.keys(o);
        },
        values: function(o) {
          return Object.keys(o).map(fn.flip(self.get)(o));
        }
      };
    }, {
      "./fn": 7,
      "./list/set": 14,
      "./util": 22
    }],
    21: [function(require, module, exports) {
      'use strict';
      var fn = require('./fn');
      module.exports = {
        toUpper: function(s) {
          return s.toUpperCase();
        },
        toLower: function(s) {
          return s.toLowerCase();
        },
        replace: fn.curry(function(a, b, s) {
          return s.replace(a, b);
        })
      };
    }, {"./fn": 7}],
    22: [function(require, module, exports) {
      'use strict';
      module.exports = {
        extend: function(target, objects) {
          objects.forEach(function(object) {
            Object.getOwnPropertyNames(object).forEach(function(property) {
              target[property] = object[property];
            });
          });
          return target;
        },
        slice: Array.prototype.slice
      };
    }, {}],
    23: [function(require, module, exports) {
      (function(global) {
        ;
        (function(root) {
          var freeExports = typeof exports == 'object' && exports;
          var freeModule = typeof module == 'object' && module && module.exports == freeExports && module;
          var freeGlobal = typeof global == 'object' && global;
          if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
            root = freeGlobal;
          }
          var punycode,
              maxInt = 2147483647,
              base = 36,
              tMin = 1,
              tMax = 26,
              skew = 38,
              damp = 700,
              initialBias = 72,
              initialN = 128,
              delimiter = '-',
              regexPunycode = /^xn--/,
              regexNonASCII = /[^ -~]/,
              regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g,
              errors = {
                'overflow': 'Overflow: input needs wider integers to process',
                'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                'invalid-input': 'Invalid input'
              },
              baseMinusTMin = base - tMin,
              floor = Math.floor,
              stringFromCharCode = String.fromCharCode,
              key;
          function error(type) {
            throw RangeError(errors[type]);
          }
          function map(array, fn) {
            var length = array.length;
            while (length--) {
              array[length] = fn(array[length]);
            }
            return array;
          }
          function mapDomain(string, fn) {
            return map(string.split(regexSeparators), fn).join('.');
          }
          function ucs2decode(string) {
            var output = [],
                counter = 0,
                length = string.length,
                value,
                extra;
            while (counter < length) {
              value = string.charCodeAt(counter++);
              if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                extra = string.charCodeAt(counter++);
                if ((extra & 0xFC00) == 0xDC00) {
                  output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                } else {
                  output.push(value);
                  counter--;
                }
              } else {
                output.push(value);
              }
            }
            return output;
          }
          function ucs2encode(array) {
            return map(array, function(value) {
              var output = '';
              if (value > 0xFFFF) {
                value -= 0x10000;
                output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                value = 0xDC00 | value & 0x3FF;
              }
              output += stringFromCharCode(value);
              return output;
            }).join('');
          }
          function basicToDigit(codePoint) {
            if (codePoint - 48 < 10) {
              return codePoint - 22;
            }
            if (codePoint - 65 < 26) {
              return codePoint - 65;
            }
            if (codePoint - 97 < 26) {
              return codePoint - 97;
            }
            return base;
          }
          function digitToBasic(digit, flag) {
            return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
          }
          function adapt(delta, numPoints, firstTime) {
            var k = 0;
            delta = firstTime ? floor(delta / damp) : delta >> 1;
            delta += floor(delta / numPoints);
            for (; delta > baseMinusTMin * tMax >> 1; k += base) {
              delta = floor(delta / baseMinusTMin);
            }
            return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
          }
          function decode(input) {
            var output = [],
                inputLength = input.length,
                out,
                i = 0,
                n = initialN,
                bias = initialBias,
                basic,
                j,
                index,
                oldi,
                w,
                k,
                digit,
                t,
                baseMinusT;
            basic = input.lastIndexOf(delimiter);
            if (basic < 0) {
              basic = 0;
            }
            for (j = 0; j < basic; ++j) {
              if (input.charCodeAt(j) >= 0x80) {
                error('not-basic');
              }
              output.push(input.charCodeAt(j));
            }
            for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
              for (oldi = i, w = 1, k = base; ; k += base) {
                if (index >= inputLength) {
                  error('invalid-input');
                }
                digit = basicToDigit(input.charCodeAt(index++));
                if (digit >= base || digit > floor((maxInt - i) / w)) {
                  error('overflow');
                }
                i += digit * w;
                t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
                if (digit < t) {
                  break;
                }
                baseMinusT = base - t;
                if (w > floor(maxInt / baseMinusT)) {
                  error('overflow');
                }
                w *= baseMinusT;
              }
              out = output.length + 1;
              bias = adapt(i - oldi, out, oldi == 0);
              if (floor(i / out) > maxInt - n) {
                error('overflow');
              }
              n += floor(i / out);
              i %= out;
              output.splice(i++, 0, n);
            }
            return ucs2encode(output);
          }
          function encode(input) {
            var n,
                delta,
                handledCPCount,
                basicLength,
                bias,
                j,
                m,
                q,
                k,
                t,
                currentValue,
                output = [],
                inputLength,
                handledCPCountPlusOne,
                baseMinusT,
                qMinusT;
            input = ucs2decode(input);
            inputLength = input.length;
            n = initialN;
            delta = 0;
            bias = initialBias;
            for (j = 0; j < inputLength; ++j) {
              currentValue = input[j];
              if (currentValue < 0x80) {
                output.push(stringFromCharCode(currentValue));
              }
            }
            handledCPCount = basicLength = output.length;
            if (basicLength) {
              output.push(delimiter);
            }
            while (handledCPCount < inputLength) {
              for (m = maxInt, j = 0; j < inputLength; ++j) {
                currentValue = input[j];
                if (currentValue >= n && currentValue < m) {
                  m = currentValue;
                }
              }
              handledCPCountPlusOne = handledCPCount + 1;
              if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                error('overflow');
              }
              delta += (m - n) * handledCPCountPlusOne;
              n = m;
              for (j = 0; j < inputLength; ++j) {
                currentValue = input[j];
                if (currentValue < n && ++delta > maxInt) {
                  error('overflow');
                }
                if (currentValue == n) {
                  for (q = delta, k = base; ; k += base) {
                    t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
                    if (q < t) {
                      break;
                    }
                    qMinusT = q - t;
                    baseMinusT = base - t;
                    output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                    q = floor(qMinusT / baseMinusT);
                  }
                  output.push(stringFromCharCode(digitToBasic(q, 0)));
                  bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                  delta = 0;
                  ++handledCPCount;
                }
              }
              ++delta;
              ++n;
            }
            return output.join('');
          }
          function toUnicode(domain) {
            return mapDomain(domain, function(string) {
              return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
            });
          }
          function toASCII(domain) {
            return mapDomain(domain, function(string) {
              return regexNonASCII.test(string) ? 'xn--' + encode(string) : string;
            });
          }
          punycode = {
            'version': '1.2.4',
            'ucs2': {
              'decode': ucs2decode,
              'encode': ucs2encode
            },
            'decode': decode,
            'encode': encode,
            'toASCII': toASCII,
            'toUnicode': toUnicode
          };
          if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
            define('punycode', function() {
              return punycode;
            });
          } else if (freeExports && !freeExports.nodeType) {
            if (freeModule) {
              freeModule.exports = punycode;
            } else {
              for (key in punycode) {
                punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
              }
            }
          } else {
            root.punycode = punycode;
          }
        }(this));
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    24: [function(require, module, exports) {
      'use strict';
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
      module.exports = function(qs, sep, eq, options) {
        sep = sep || '&';
        eq = eq || '=';
        var obj = {};
        if (typeof qs !== 'string' || qs.length === 0) {
          return obj;
        }
        var regexp = /\+/g;
        qs = qs.split(sep);
        var maxKeys = 1000;
        if (options && typeof options.maxKeys === 'number') {
          maxKeys = options.maxKeys;
        }
        var len = qs.length;
        if (maxKeys > 0 && len > maxKeys) {
          len = maxKeys;
        }
        for (var i = 0; i < len; ++i) {
          var x = qs[i].replace(regexp, '%20'),
              idx = x.indexOf(eq),
              kstr,
              vstr,
              k,
              v;
          if (idx >= 0) {
            kstr = x.substr(0, idx);
            vstr = x.substr(idx + 1);
          } else {
            kstr = x;
            vstr = '';
          }
          k = decodeURIComponent(kstr);
          v = decodeURIComponent(vstr);
          if (!hasOwnProperty(obj, k)) {
            obj[k] = v;
          } else if (isArray(obj[k])) {
            obj[k].push(v);
          } else {
            obj[k] = [obj[k], v];
          }
        }
        return obj;
      };
      var isArray = Array.isArray || function(xs) {
        return Object.prototype.toString.call(xs) === '[object Array]';
      };
    }, {}],
    25: [function(require, module, exports) {
      'use strict';
      var stringifyPrimitive = function(v) {
        switch (typeof v) {
          case 'string':
            return v;
          case 'boolean':
            return v ? 'true' : 'false';
          case 'number':
            return isFinite(v) ? v : '';
          default:
            return '';
        }
      };
      module.exports = function(obj, sep, eq, name) {
        sep = sep || '&';
        eq = eq || '=';
        if (obj === null) {
          obj = undefined;
        }
        if (typeof obj === 'object') {
          return map(objectKeys(obj), function(k) {
            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
            if (isArray(obj[k])) {
              return map(obj[k], function(v) {
                return ks + encodeURIComponent(stringifyPrimitive(v));
              }).join(sep);
            } else {
              return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
            }
          }).join(sep);
        }
        if (!name)
          return '';
        return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
      };
      var isArray = Array.isArray || function(xs) {
        return Object.prototype.toString.call(xs) === '[object Array]';
      };
      function map(xs, f) {
        if (xs.map)
          return xs.map(f);
        var res = [];
        for (var i = 0; i < xs.length; i++) {
          res.push(f(xs[i], i));
        }
        return res;
      }
      var objectKeys = Object.keys || function(obj) {
        var res = [];
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key))
            res.push(key);
        }
        return res;
      };
    }, {}],
    26: [function(require, module, exports) {
      'use strict';
      exports.decode = exports.parse = require('./decode');
      exports.encode = exports.stringify = require('./encode');
    }, {
      "./decode": 24,
      "./encode": 25
    }],
    27: [function(require, module, exports) {
      var punycode = require('punycode');
      exports.parse = urlParse;
      exports.resolve = urlResolve;
      exports.resolveObject = urlResolveObject;
      exports.format = urlFormat;
      exports.Url = Url;
      function Url() {
        this.protocol = null;
        this.slashes = null;
        this.auth = null;
        this.host = null;
        this.port = null;
        this.hostname = null;
        this.hash = null;
        this.search = null;
        this.query = null;
        this.pathname = null;
        this.path = null;
        this.href = null;
      }
      var protocolPattern = /^([a-z0-9.+-]+:)/i,
          portPattern = /:[0-9]*$/,
          delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
          unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
          autoEscape = ['\''].concat(unwise),
          nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
          hostEndingChars = ['/', '?', '#'],
          hostnameMaxLen = 255,
          hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
          hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
          unsafeProtocol = {
            'javascript': true,
            'javascript:': true
          },
          hostlessProtocol = {
            'javascript': true,
            'javascript:': true
          },
          slashedProtocol = {
            'http': true,
            'https': true,
            'ftp': true,
            'gopher': true,
            'file': true,
            'http:': true,
            'https:': true,
            'ftp:': true,
            'gopher:': true,
            'file:': true
          },
          querystring = require('querystring');
      function urlParse(url, parseQueryString, slashesDenoteHost) {
        if (url && isObject(url) && url instanceof Url)
          return url;
        var u = new Url;
        u.parse(url, parseQueryString, slashesDenoteHost);
        return u;
      }
      Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
        if (!isString(url)) {
          throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
        }
        var rest = url;
        rest = rest.trim();
        var proto = protocolPattern.exec(rest);
        if (proto) {
          proto = proto[0];
          var lowerProto = proto.toLowerCase();
          this.protocol = lowerProto;
          rest = rest.substr(proto.length);
        }
        if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var slashes = rest.substr(0, 2) === '//';
          if (slashes && !(proto && hostlessProtocol[proto])) {
            rest = rest.substr(2);
            this.slashes = true;
          }
        }
        if (!hostlessProtocol[proto] && (slashes || (proto && !slashedProtocol[proto]))) {
          var hostEnd = -1;
          for (var i = 0; i < hostEndingChars.length; i++) {
            var hec = rest.indexOf(hostEndingChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
          var auth,
              atSign;
          if (hostEnd === -1) {
            atSign = rest.lastIndexOf('@');
          } else {
            atSign = rest.lastIndexOf('@', hostEnd);
          }
          if (atSign !== -1) {
            auth = rest.slice(0, atSign);
            rest = rest.slice(atSign + 1);
            this.auth = decodeURIComponent(auth);
          }
          hostEnd = -1;
          for (var i = 0; i < nonHostChars.length; i++) {
            var hec = rest.indexOf(nonHostChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
          if (hostEnd === -1)
            hostEnd = rest.length;
          this.host = rest.slice(0, hostEnd);
          rest = rest.slice(hostEnd);
          this.parseHost();
          this.hostname = this.hostname || '';
          var ipv6Hostname = this.hostname[0] === '[' && this.hostname[this.hostname.length - 1] === ']';
          if (!ipv6Hostname) {
            var hostparts = this.hostname.split(/\./);
            for (var i = 0,
                l = hostparts.length; i < l; i++) {
              var part = hostparts[i];
              if (!part)
                continue;
              if (!part.match(hostnamePartPattern)) {
                var newpart = '';
                for (var j = 0,
                    k = part.length; j < k; j++) {
                  if (part.charCodeAt(j) > 127) {
                    newpart += 'x';
                  } else {
                    newpart += part[j];
                  }
                }
                if (!newpart.match(hostnamePartPattern)) {
                  var validParts = hostparts.slice(0, i);
                  var notHost = hostparts.slice(i + 1);
                  var bit = part.match(hostnamePartStart);
                  if (bit) {
                    validParts.push(bit[1]);
                    notHost.unshift(bit[2]);
                  }
                  if (notHost.length) {
                    rest = '/' + notHost.join('.') + rest;
                  }
                  this.hostname = validParts.join('.');
                  break;
                }
              }
            }
          }
          if (this.hostname.length > hostnameMaxLen) {
            this.hostname = '';
          } else {
            this.hostname = this.hostname.toLowerCase();
          }
          if (!ipv6Hostname) {
            var domainArray = this.hostname.split('.');
            var newOut = [];
            for (var i = 0; i < domainArray.length; ++i) {
              var s = domainArray[i];
              newOut.push(s.match(/[^A-Za-z0-9_-]/) ? 'xn--' + punycode.encode(s) : s);
            }
            this.hostname = newOut.join('.');
          }
          var p = this.port ? ':' + this.port : '';
          var h = this.hostname || '';
          this.host = h + p;
          this.href += this.host;
          if (ipv6Hostname) {
            this.hostname = this.hostname.substr(1, this.hostname.length - 2);
            if (rest[0] !== '/') {
              rest = '/' + rest;
            }
          }
        }
        if (!unsafeProtocol[lowerProto]) {
          for (var i = 0,
              l = autoEscape.length; i < l; i++) {
            var ae = autoEscape[i];
            var esc = encodeURIComponent(ae);
            if (esc === ae) {
              esc = escape(ae);
            }
            rest = rest.split(ae).join(esc);
          }
        }
        var hash = rest.indexOf('#');
        if (hash !== -1) {
          this.hash = rest.substr(hash);
          rest = rest.slice(0, hash);
        }
        var qm = rest.indexOf('?');
        if (qm !== -1) {
          this.search = rest.substr(qm);
          this.query = rest.substr(qm + 1);
          if (parseQueryString) {
            this.query = querystring.parse(this.query);
          }
          rest = rest.slice(0, qm);
        } else if (parseQueryString) {
          this.search = '';
          this.query = {};
        }
        if (rest)
          this.pathname = rest;
        if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
          this.pathname = '/';
        }
        if (this.pathname || this.search) {
          var p = this.pathname || '';
          var s = this.search || '';
          this.path = p + s;
        }
        this.href = this.format();
        return this;
      };
      function urlFormat(obj) {
        if (isString(obj))
          obj = urlParse(obj);
        if (!(obj instanceof Url))
          return Url.prototype.format.call(obj);
        return obj.format();
      }
      Url.prototype.format = function() {
        var auth = this.auth || '';
        if (auth) {
          auth = encodeURIComponent(auth);
          auth = auth.replace(/%3A/i, ':');
          auth += '@';
        }
        var protocol = this.protocol || '',
            pathname = this.pathname || '',
            hash = this.hash || '',
            host = false,
            query = '';
        if (this.host) {
          host = auth + this.host;
        } else if (this.hostname) {
          host = auth + (this.hostname.indexOf(':') === -1 ? this.hostname : '[' + this.hostname + ']');
          if (this.port) {
            host += ':' + this.port;
          }
        }
        if (this.query && isObject(this.query) && Object.keys(this.query).length) {
          query = querystring.stringify(this.query);
        }
        var search = this.search || (query && ('?' + query)) || '';
        if (protocol && protocol.substr(-1) !== ':')
          protocol += ':';
        if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
          host = '//' + (host || '');
          if (pathname && pathname.charAt(0) !== '/')
            pathname = '/' + pathname;
        } else if (!host) {
          host = '';
        }
        if (hash && hash.charAt(0) !== '#')
          hash = '#' + hash;
        if (search && search.charAt(0) !== '?')
          search = '?' + search;
        pathname = pathname.replace(/[?#]/g, function(match) {
          return encodeURIComponent(match);
        });
        search = search.replace('#', '%23');
        return protocol + host + pathname + search + hash;
      };
      function urlResolve(source, relative) {
        return urlParse(source, false, true).resolve(relative);
      }
      Url.prototype.resolve = function(relative) {
        return this.resolveObject(urlParse(relative, false, true)).format();
      };
      function urlResolveObject(source, relative) {
        if (!source)
          return relative;
        return urlParse(source, false, true).resolveObject(relative);
      }
      Url.prototype.resolveObject = function(relative) {
        if (isString(relative)) {
          var rel = new Url();
          rel.parse(relative, false, true);
          relative = rel;
        }
        var result = new Url();
        Object.keys(this).forEach(function(k) {
          result[k] = this[k];
        }, this);
        result.hash = relative.hash;
        if (relative.href === '') {
          result.href = result.format();
          return result;
        }
        if (relative.slashes && !relative.protocol) {
          Object.keys(relative).forEach(function(k) {
            if (k !== 'protocol')
              result[k] = relative[k];
          });
          if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
            result.path = result.pathname = '/';
          }
          result.href = result.format();
          return result;
        }
        if (relative.protocol && relative.protocol !== result.protocol) {
          if (!slashedProtocol[relative.protocol]) {
            Object.keys(relative).forEach(function(k) {
              result[k] = relative[k];
            });
            result.href = result.format();
            return result;
          }
          result.protocol = relative.protocol;
          if (!relative.host && !hostlessProtocol[relative.protocol]) {
            var relPath = (relative.pathname || '').split('/');
            while (relPath.length && !(relative.host = relPath.shift()))
              ;
            if (!relative.host)
              relative.host = '';
            if (!relative.hostname)
              relative.hostname = '';
            if (relPath[0] !== '')
              relPath.unshift('');
            if (relPath.length < 2)
              relPath.unshift('');
            result.pathname = relPath.join('/');
          } else {
            result.pathname = relative.pathname;
          }
          result.search = relative.search;
          result.query = relative.query;
          result.host = relative.host || '';
          result.auth = relative.auth;
          result.hostname = relative.hostname || relative.host;
          result.port = relative.port;
          if (result.pathname || result.search) {
            var p = result.pathname || '';
            var s = result.search || '';
            result.path = p + s;
          }
          result.slashes = result.slashes || relative.slashes;
          result.href = result.format();
          return result;
        }
        var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
            isRelAbs = (relative.host || relative.pathname && relative.pathname.charAt(0) === '/'),
            mustEndAbs = (isRelAbs || isSourceAbs || (result.host && relative.pathname)),
            removeAllDots = mustEndAbs,
            srcPath = result.pathname && result.pathname.split('/') || [],
            relPath = relative.pathname && relative.pathname.split('/') || [],
            psychotic = result.protocol && !slashedProtocol[result.protocol];
        if (psychotic) {
          result.hostname = '';
          result.port = null;
          if (result.host) {
            if (srcPath[0] === '')
              srcPath[0] = result.host;
            else
              srcPath.unshift(result.host);
          }
          result.host = '';
          if (relative.protocol) {
            relative.hostname = null;
            relative.port = null;
            if (relative.host) {
              if (relPath[0] === '')
                relPath[0] = relative.host;
              else
                relPath.unshift(relative.host);
            }
            relative.host = null;
          }
          mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
        }
        if (isRelAbs) {
          result.host = (relative.host || relative.host === '') ? relative.host : result.host;
          result.hostname = (relative.hostname || relative.hostname === '') ? relative.hostname : result.hostname;
          result.search = relative.search;
          result.query = relative.query;
          srcPath = relPath;
        } else if (relPath.length) {
          if (!srcPath)
            srcPath = [];
          srcPath.pop();
          srcPath = srcPath.concat(relPath);
          result.search = relative.search;
          result.query = relative.query;
        } else if (!isNullOrUndefined(relative.search)) {
          if (psychotic) {
            result.hostname = result.host = srcPath.shift();
            var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
            if (authInHost) {
              result.auth = authInHost.shift();
              result.host = result.hostname = authInHost.shift();
            }
          }
          result.search = relative.search;
          result.query = relative.query;
          if (!isNull(result.pathname) || !isNull(result.search)) {
            result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
          }
          result.href = result.format();
          return result;
        }
        if (!srcPath.length) {
          result.pathname = null;
          if (result.search) {
            result.path = '/' + result.search;
          } else {
            result.path = null;
          }
          result.href = result.format();
          return result;
        }
        var last = srcPath.slice(-1)[0];
        var hasTrailingSlash = ((result.host || relative.host) && (last === '.' || last === '..') || last === '');
        var up = 0;
        for (var i = srcPath.length; i >= 0; i--) {
          last = srcPath[i];
          if (last == '.') {
            srcPath.splice(i, 1);
          } else if (last === '..') {
            srcPath.splice(i, 1);
            up++;
          } else if (up) {
            srcPath.splice(i, 1);
            up--;
          }
        }
        if (!mustEndAbs && !removeAllDots) {
          for (; up--; up) {
            srcPath.unshift('..');
          }
        }
        if (mustEndAbs && srcPath[0] !== '' && (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
          srcPath.unshift('');
        }
        if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
          srcPath.push('');
        }
        var isAbsolute = srcPath[0] === '' || (srcPath[0] && srcPath[0].charAt(0) === '/');
        if (psychotic) {
          result.hostname = result.host = isAbsolute ? '' : srcPath.length ? srcPath.shift() : '';
          var authInHost = result.host && result.host.indexOf('@') > 0 ? result.host.split('@') : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
          }
        }
        mustEndAbs = mustEndAbs || (result.host && srcPath.length);
        if (mustEndAbs && !isAbsolute) {
          srcPath.unshift('');
        }
        if (!srcPath.length) {
          result.pathname = null;
          result.path = null;
        } else {
          result.pathname = srcPath.join('/');
        }
        if (!isNull(result.pathname) || !isNull(result.search)) {
          result.path = (result.pathname ? result.pathname : '') + (result.search ? result.search : '');
        }
        result.auth = relative.auth || result.auth;
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
      };
      Url.prototype.parseHost = function() {
        var host = this.host;
        var port = portPattern.exec(host);
        if (port) {
          port = port[0];
          if (port !== ':') {
            this.port = port.substr(1);
          }
          host = host.substr(0, host.length - port.length);
        }
        if (host)
          this.hostname = host;
      };
      function isString(arg) {
        return typeof arg === "string";
      }
      function isObject(arg) {
        return typeof arg === 'object' && arg !== null;
      }
      function isNull(arg) {
        return arg === null;
      }
      function isNullOrUndefined(arg) {
        return arg == null;
      }
    }, {
      "punycode": 23,
      "querystring": 26
    }]
  }, {}, [1]);
})(require('process'));
