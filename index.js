import fs from "fs"
import path from "path"
import ejs from "ejs"
import parser from "@babel/parser"
import traverse from "@babel/traverse"
import { transformFromAstSync } from "babel-core"
import { jsonLoader } from "./jsonLoader.js"
import { changeOutputPath } from "./changeOutputPath.js"
import { SyncHook } from "tapable"

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
  plugins: [new changeOutputPath()],
}

const hooks = {
  emitFile: new SyncHook(["context"]),
}

function createAsset(filePath) {
  // 获取文件内容
  let source = fs.readFileSync(filePath, {
    encoding: "utf-8",
  })

  // init loader
  const loaders = webpackConfig.module.rules
  const loaderContext = {
    addDeps(dep) {
      console.log("addDeps", dep)
    },
  }
  loaders.forEach(({ test, use }) => {
    if (test.test(filePath)) {
      if (Array.isArray(use)) {
        use.reverse().forEach((fn) => {
          source = fn.call(loaderContext, source)
        })
      } else {
        source = use(loaderContext, source)
      }
      console.log(source)
    }
  })

  // 获取依赖关系 ast -> 抽象语法树
  const ast = parser.parse(source, { sourceType: "module" })
  const deps = []
  traverse.default(ast, {
    ImportDeclaration({ node }) {
      deps.push(node.source.value)
    },
  })
  const { code } = transformFromAstSync(ast, null, {
    presets: ["env"],
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
  const mainAsset = createAsset("./example/main.js")
  const queue = [mainAsset]

  for (const asset of queue) {
    asset.deps.forEach((relativePath) => {
      const child = createAsset(path.resolve("./example", relativePath))
      asset.mapping[relativePath] = child.id
      queue.push(child)
    })
  }
  return queue
}

function initPlugin() {
  const plugins = webpackConfig.plugins
  plugins.forEach((plugin) => {
    // 注册事件
    plugin.apply(hooks)
  })
}
initPlugin()

const graph = createGraph()

function build(graph) {
  const template = fs.readFileSync("./bundle.ejs", { encoding: "utf-8" })
  const data = graph.map((asset) => {
    const { id, code, mapping } = asset
    return {
      id,
      code,
      mapping,
    }
  })
  const code = ejs.render(template, { data })

  let outputPath = "./dist/bundle.js"
  const context = {
    changeOutputPath(path) {
      outputPath = path
    },
  }
  // 执行事件
  hooks.emitFile.call(context)
  fs.writeFileSync(outputPath, code)
}
build(graph)
