function setHeader(ctx) {
  ctx.set('Access-Control-Allow-Origin', ctx.req.headers.origin)
  ctx.set(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Credentials', true)
}

function optionsInterceptors(ctx, next) {
  if (ctx.request.method === 'OPTIONS') {
    ctx.body = {
      code: 0,
      message: 'ok'
    }
  }
}

module.exports = function() {
  return async function(ctx, next) {
    setHeader(ctx)
    optionsInterceptors(ctx)
    await next()
  }
}
