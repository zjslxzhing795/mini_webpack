;(function (modules) {
  function require(id) {
    const [fn, mapping] = modules[id]
    const module = {
      exports: {},
    }
    function localRequire(filePath) {
      const id = mapping[filePath]
      return require(id)
    }
    fn(localRequire, module, module.exports)

    return module.exports
  }
  require(1)
})({
  1: [
    function (require, module, exports) {
      // import foo from "./foo.js" esm
      const { foo } = require("./foo.js") // cjs

      foo()
      console.log("main.js")
    },
    {
      "./foo.js": 2,
    },
  ],
  2: [
    function (require, module, exports) {
      function foo() {
        console.log("foo.js")
      }

      module.exports = {
        foo,
      }
    },
    {},
  ],
})
