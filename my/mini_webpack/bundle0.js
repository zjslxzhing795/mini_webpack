// require的作用之一就是调用fn重写module.exports然后将其返回
function require(filePath) {
  const map = {
    "./main.js": mainjs,
    "./foo.js": foojs,
  }
  const fn = map[filePath]
  const module = {
    exports: {},
  }
  fn(module) // 这里调用可能会重写module.exports
  return module.exports
}
// mainjs()
require("./main.js")

function mainjs(module) {
  //   import { foo } from "./foo.js"
  const { foo } = require("./foo.js")
  foo()
  console.log("main")
}
function foojs(module) {
  function foo() {
    console.log("foo")
  }
  module.exports = { foo }
}
