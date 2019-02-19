function log(ctx) {
  console.info(
    'Async Logger Method:',
    ctx.method,
    'Host:',
    ctx.header.host + ctx.url
  )
}

module.exports = function() {
  return async function(ctx, next) {
    log(ctx)
    await next()
  }
}
