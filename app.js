// https://chenshenhai.github.io/koa2-note/note/upload/busboy.html
// Koa
const Koa = require('koa')
const convert = require('koa-convert')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const path = require('path')

const loggerGenerator = require('./middleware/logger-generator')
const loggerAsync = require('./middleware/logger-async')
const loggerUrl = require('./middleware/logger-url-parse')

const app = new Koa()
const router = require('./router')

// Static relative path
const staticPath = './public'
app.use(static(path.join(__dirname, staticPath)))

// MiddleWare logger
// app.use(convert(loggerGenerator()))
app.use(loggerAsync())
// app.use(loggerUrl())

// 使用ctx.body解析中间件
app.use(bodyParser())

// Middle route
// app.use(router.routes()).use(router.allowedMethods())

// set up
app.listen(3000, () => {
  console.log('demo start-quick is starting at port 3000')
})
