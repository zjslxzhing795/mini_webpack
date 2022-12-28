export class ChangeOutputPath {
  apply(compiler) {
    compiler.hooks.changeOutputPath.tap("changeOutputPath", compiler.fn)
    compiler.hooks.changeOutputPath.call()
  }
}
