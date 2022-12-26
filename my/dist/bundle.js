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

// main里不能export
(0, _foo.foo)();
console.log("main"); 
        }, {"./foo.js":1} ],
    
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
        }, {"./bar.js":2} ],
    
        "2": [function (require, module, exports) {
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
