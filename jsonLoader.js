export function jsonLoader(source) {
  console.log(source)
  this.addDeps("jsonLoader")
  return `export default ${JSON.stringify(source)}`
}
