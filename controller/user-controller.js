const hello = async (ctx, next) => {
  ctx.body = 'hello world as'
  ctx.status = 200
}

module.exports = {
  'test/hello': hello
}
