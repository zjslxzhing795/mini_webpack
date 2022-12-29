import {
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
  AsyncSeriesLoopHook,
} from "tapable"

/**
 * 异步串行钩子
 * AsyncSeriesHook + tapAsync
 */
// const queue1 = new AsyncSeriesHook(["name"])
// console.time("cost1")
// // 注册goods
// queue1.tapAsync("1", (name, cb) => {
//   setTimeout(() => {
//     console.log((name, 1))
//     cb(null, "1")
//   }, 3000)
// })
// queue1.tapAsync("2", (name, cb) => {
//   setTimeout(() => {
//     console.log((name, 2))
//     cb(null, "2")
//   }, 2000)
// })
// queue1.tapAsync("3", (name, cb) => {
//   setTimeout(() => {
//     console.log((name, 3))
//     cb(null, "3")
//   }, 1000)
// })
// //消费触发
// queue1.callAsync("series tapAsync", (res) => {
//   console.log("over", res)
//   console.timeEnd("cost1")
// })

/**
 * 异步串行钩子
 * AsyncSeriesHook + tapPromise
 */
// const queue2 = new AsyncSeriesHook(["name"])
// console.time("cost2")
// // 注册goods
// queue2.tapPromise("1", (name) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log((name, 1))
//       resolve(1)
//     }, 3000)
//   })
// })
// queue2.tapPromise("2", (name) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log((name, 2))
//       resolve(2)
//     }, 2000)
//   })
// })
// queue2.tapPromise("3", (name) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log((name, 3))
//       resolve(3)
//     }, 1000)
//   })
// })

// // 消费触发
// queue2
//   .promise("series tapPromise")
//   .then((res) => {
//     console.log("over", res)
//     console.timeEnd("cost2")
//   })
//   .catch((err) => {
//     console.log("over", err)
//     console.timeEnd("cost2")
//   })

/**
 * 异步串行钩子
 * AsyncSeriesBailHook + tapAsync
 */
// const queue3 = new AsyncSeriesBailHook(["name"])
// console.time("cost3")
// // 注册goods
// queue3.tapAsync("1", (name, cb) => {
//   setTimeout(() => {
//     console.log((name, 1))
//     cb()
//   }, 3000)
// })
// queue3.tapAsync("2", (name, cb) => {
//   setTimeout(() => {
//     console.log((name, 2))
//     cb(null, "2") // 让3不再接力
//   }, 2000)
// })
// queue3.tapAsync("3", (name, cb) => {
//   setTimeout(() => {
//     console.log((name, 3))
//     cb()
//   }, 1000)
// })
// //消费触发
// queue3.callAsync("seriesBail tapAsync", (res) => {
//   console.log("over", res)
//   console.timeEnd("cost3")
// })

/**
 * 异步串行钩子
 * AsyncSeriesBailHook + tapPromise
 */
// const queue4 = new AsyncSeriesBailHook(["name"])
// console.time("cost4")
// // 注册goods
// queue4.tapPromise("1", (name) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log((name, 1))
//       reject(1) // reject后面的也不再进行
//     }, 3000)
//   })
// })
// queue4.tapPromise("2", (name) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log((name, 2))
//       resolve(2) // 一旦传入值则下面的不再进行
//     }, 2000)
//   })
// })
// queue4.tapPromise("3", (name) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log((name, 3))
//       resolve()
//     }, 1000)
//   })
// })

// // 消费触发
// queue4
//   .promise("seriesBail tapPromise")
//   .then((res) => {
//     console.log("over", res)
//     console.timeEnd("cost4")
//   })
//   .catch((err) => {
//     console.log("err", err)
//     console.timeEnd("cost4")
//   })

/**
 * 异步串行钩子
 * AsyncSeriesWaterfallHook + tapAsync
 */
// const queue5 = new AsyncSeriesWaterfallHook(["name"])
// console.time("cost5")
// // 注册goods
// queue5.tapAsync("1", (name, cb) => {
//   setTimeout(() => {
//     console.log(name)
//     cb(null, "1")
//   }, 3000)
// })
// queue5.tapAsync("2", (data, cb) => {
//   setTimeout(() => {
//     console.log("从上一个拿到的值:", data)
//     cb(null, "2")
//   }, 2000)
// })
// queue5.tapAsync("3", (data, cb) => {
//   setTimeout(() => {
//     console.log("从上一个拿到的值:", data)
//     cb()
//   }, 1000)
// })
// //消费触发
// queue5.callAsync("seriesBailWaterfall tapAsync", (res) => {
//   console.log("over", res)
//   console.timeEnd("cost5")
// })

/**
 * 异步串行钩子
 * AsyncSeriesWaterfallHook + tapPromise
 */
const queue6 = new AsyncSeriesWaterfallHook(["name"])
console.time("cost6")
// 注册goods
queue6.tapPromise("1", (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log((name, 1))
      resolve(1) // reject后面的也不再进行
    }, 3000)
  })
})
queue6.tapPromise("2", (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("从上一个拿到的值:", data)
      resolve(2) // 一旦传入值则下面的不再进行
    }, 2000)
  })
})
queue6.tapPromise("3", (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("从上一个拿到的值:", data)
      resolve()
    }, 1000)
  })
})

// 消费触发
queue6
  .promise("seriesWaterfall tapPromise")
  .then((res) => {
    console.log("over", res)
    console.timeEnd("cost6")
  })
  .catch((err) => {
    console.log("err", err)
    console.timeEnd("cost6")
  })
