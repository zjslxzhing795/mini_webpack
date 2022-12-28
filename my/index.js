import fs from "fs"
import path from "path"
import babelParser from "@babel/parser"
import babelTraverse from "@babel/traverse"
import { transformFromAst } from "babel-core"
import ejs from "ejs"
import { jsonLoader } from "./jsonLoader.js"

let id = 0
const webpackConfig = {
  module: {
    rules: [
      {
        test: /\.json$/,
        use: [jsonLoader],
      },
    ],
  },
}
function createAsset(filePath) {
  // 获取文件路径 fs读取文件 文件转换成ast 解析获取文件名
  // readFileSync .相对于根目录，而不是当前目录
  let source = fs.readFileSync(filePath, {
    encoding: "utf-8",
  })

  // init loader
  const loaders = webpackConfig.module.rules
  const loaderContext = {
    addDeps(deps) {
      console.log("addDeps:", deps)
    },
  }
  loaders.forEach(({ test, use }) => {
    if (test.test(filePath)) {
      if (Array.isArray(use)) {
        use.reverse().forEach((loader) => {
          source = loader.call(loaderContext, source)
        })
      }
    }
  })
  // 获取文件内容 ast转换为内容
  const ast = babelParser.parse(source, { sourceType: "module" })
  const deps = []
  babelTraverse.default(ast, {
    // ImportDeclaration是type， 把node解构出来， 这两种都有利于筛选结果
    ImportDeclaration({ node }) {
      deps.push(node.source.value)
    },
  })
  const { code } = transformFromAst(ast, null, {
    presets: ["env"], // cjs规范
  })
  return {
    id: id++,
    filePath,
    code,
    deps,
    mapping: {},
  }
}

function createGraph() {
  // 递归构建
  const mainAssert = createAsset("./my/mini_webpack/main.js")
  const queue = [mainAssert]
  // 使用for of，在循环内追加数据后会遍历到，使用forEcah则遍历不到
  for (const asset of queue) {
    asset.deps.forEach((relativePath) => {
      const child = createAsset(path.resolve("./my/mini_webpack", relativePath))
      // 不要直接对象赋值，当deps有多个child的时候会覆盖
      asset.mapping[relativePath] = child.id
      queue.push(child)
    })
  }
  // queue.forEach((asset) => {

  // })
  return queue
}
const graph = createGraph()
// console.log(graph)

function build(graph) {
  const template = fs.readFileSync(path.resolve("./my", "bundle.ejs"), {
    encoding: "utf-8",
  })
  const data = graph.map((asset) => {
    const { filePath, code, id, mapping } = asset
    return { filePath, code, id, mapping }
  })
  const code = ejs.render(template, { data })
  fs.writeFileSync("./my/dist/bundle.js", code)
}
build(graph)
