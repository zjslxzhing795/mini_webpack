;(function (mapping) {
  function require(filePath) {
    const fn = mapping[filePath]
    const module = {
      exports: {},
    }
    fn(require, module) // 这里调用可能会重写module.exports
    return module.exports
  }
  require("./main.js")
})({
  "./main.js": function (require, module) {
    //   import { foo } from "./foo.js"
    const { foo } = require("./foo.js")
    foo()
    console.log("main")
  },
  "./foo.js": function (require, module) {
    function foo() {
      console.log("foo")
    }
    module.exports = { foo }
  },
})
