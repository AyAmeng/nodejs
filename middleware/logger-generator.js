function log(ctx) {
  console.info(
    'Generator Logger Method:',
    ctx.method,
    'Host:',
    ctx.header.host + ctx.url
  )
}

module.exports = function() {
  return function*(next) {
    log(this)
    if (next) {
      yield next
    }
  }
}
