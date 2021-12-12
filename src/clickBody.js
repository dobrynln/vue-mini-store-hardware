export default {
  bind (bindings) {
    document.querySelector('body').addEventListener('click', function () {
      bindings = false
    })
  }
}
