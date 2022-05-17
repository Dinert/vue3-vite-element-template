
const directives = { // 指令对象
}
export default {
  install(app) {
    Object.keys(directives).forEach((key) => {
      app.directive(key, directives[key])
    });
  }
}