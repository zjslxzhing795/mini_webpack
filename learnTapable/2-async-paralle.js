import { AsyncParallelHook, AsyncParallelBailHook } from "tapable"

/**
 * 异步并行
 * AsyncParallelHook + tapAsync
 *
 */
// todo: 以下cb(null, 1)传参数与["name", "age"] (err, res)的对应关系搞不准，有时候是第一个输出后就不输出第二个里的cb,有时候两个cb都输出
const queue1 = new AsyncParallelHook(["name", "age"]) // 这里控制有几个入参，名字不重要，仅仅是个标记，但最好语义化
console.time("cost1")
queue1.tapAsync("1", (name, cb) => {
  setTimeout(() => {
    console.log(name, 111)
    cb(null, 1) // 对应(err, res) => {}里的err res
  }, 1000)
})
queue1.tapAsync("2", (name, cb) => {
  setTimeout(() => {
    console.log(name, 222)
    cb(null, 2)
  }, 2000)
})
// "name-tapAsync"对应tapAsync第二个函数里的name，(err, res)对应是cb
queue1.callAsync("name-tapAsync", (err, res) => {
  // err, res分别对应["name", "number"]
  console.log("err", err)
  console.log("over", res)
  console.timeEnd("cost1")
})

/**
 * 异步并行
 * AsyncParallelBailHook + tapPromise
 */
// const queue2 = new AsyncParallelBailHook(["name"])
// console.time("cost2")
// queue2.tapPromise("1", (name) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(name, 111)
//       reject("1")
//     }, 2000)
//   })
// })
// queue2.tapPromise("2", (name) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(name, 222)
//       resolve("2")
//     }, 1000)
//   })
// })
// queue2
//   .promise("tapPromise")
//   .then((res) => {
//     console.log("over", res)
//     console.timeEnd("cost2")
//   })
//   .catch((err) => {
//     console.log("err", err)
//     console.timeEnd("cost2")
//   })
