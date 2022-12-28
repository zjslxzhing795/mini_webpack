import { foo } from "./foo.js"
import user from "./user.json"
// main里不能export
foo()
console.log("main")
console.log(user)
