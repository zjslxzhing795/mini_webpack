// 同步钩子
import {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
} from "tapable"

/**
 * SyncHook 的使用
 */
// 初始化hook, 确定参数
const syncHk = new SyncHook(["name", "age"])

// 生产商品， 注册事件
syncHk.tap("plugin1", (name, age) => {
  console.log("plugin1", name, age)
})
syncHk.tap("plugin2", (name, age) => {
  console.log("plugin2", name, age)
})
syncHk.call("zj-1", 18)
// node运行 result
// plugin1 zj-1 18
// plugin2 zj-1 18

/**
 * SyncBailHook 的使用
 */
const bailHk = new SyncBailHook(["name", "age"])
bailHk.tap("a", (name, age) => {
  console.log("a", name, age)
})
bailHk.tap("b", (name, age) => {
  console.log("b", name, age)
  return 0 // 阻止后面的执行
})
bailHk.tap("c", (name, age) => {
  console.log("c", name, age)
})
bailHk.call("zhangsan", 20)
// node运行 result
// a zhangsan 20
// b zhangsan 20

/**
 * SyncWaterfallHook 的使用
 */
const waterfullHk = new SyncWaterfallHook(["name"])
waterfullHk.tap("aa", (name) => {
  console.log("aa", name)
  return "a-a"
})
waterfullHk.tap("bb", (data) => {
  console.log("bb", data)
  return "b-b"
})
waterfullHk.tap("cc", (name) => {
  console.log("cc", name)
  return "c-c"
})

waterfullHk.call("lisi")
// node运行 result
// aa lisi
// bb a-a
// cc b-b

/**
 * SyncLoopHook 的使用
 */
const loopHk = new SyncLoopHook(["a"])

let count = 1

loopHk.tap("sum", (a) => {
  if (count >= a) {
    console.log("end")
    return
  }
  count++
  return 1
})
loopHk.call(5)
console.log(count)
// node运行 result
// end
// 5
