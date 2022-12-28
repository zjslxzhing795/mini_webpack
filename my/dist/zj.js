;(function (mapping) {
  function require(id) {
    const [fn, map] = mapping[id]
    const module = {
      exports: {},
    }
    function localRequire(filaPath) {
      const id = map[filaPath]
      return require(id)
    }
    fn(localRequire, module, module.exports) // 这里调用可能会重写module.exports
    return module.exports
  }
  require(0)
})({
    
        "0": [function (require, module, exports) {
            "use strict";

var _foo = require("./foo.js");

var _user = require("./user.json");

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// main里不能export
(0, _foo.foo)();
console.log("main");
console.log(_user2.default); 
        }, {"./foo.js":1,"./user.json":2} ],
    
        "1": [function (require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

var _bar = require("./bar.js");

function foo() {
  console.log("foo");
  (0, _bar.bar)();
} 
        }, {"./bar.js":3} ],
    
        "2": [function (require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "{\n  \"name\": \"grace\",\n  \"age\": 18\n}\n"; 
        }, {} ],
    
        "3": [function (require, module, exports) {
            "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bar = bar;

function bar() {
  console.log("bar");
} 
        }, {} ],
    
})
