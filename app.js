// https://chenshenhai.github.io/koa2-note/note/upload/busboy.html
// Koa
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const convert = require('koa-convert')
const path = require('path')

const views = require('koa-views')

const loggerGenerator = require('./middleware/logger-generator')
const loggerAsync = require('./middleware/logger-async')
const loggerUrl = require('./middleware/logger-url-parse')

const { uploadFile } = require('./utils/upload')

const app = new Koa()

const router = require('./router')

// Static relative path
const view = 'views'
app.use(
  views(path.join(__dirname, view), {
    extension: 'ejs'
  })
)

const statics = './static'

app.use(static(path.join(__dirname, statics)))

// MiddleWare logger
// app.use(convert(loggerGenerator()))
app.use(loggerAsync())
// app.use(loggerUrl())

// 使用ctx.body解析中间件
app.use(bodyParser())

// Middle route
// app.use(router.routes()).use(router.allowedMethods())

app.use(async ctx => {
  if (ctx.method === 'GET') {
    let title = 'upload pic async'
    await ctx.render('index', {
      title
    })
  } else if (ctx.url === '/api/picture/upload.json' && ctx.method === 'POST') {
    // 上传文件请求处理
    let result = { success: false }
    let serverFilePath = path.join(__dirname, 'static/image')

    // 上传文件事件
    result = await uploadFile(ctx, {
      fileType: 'album',
      path: serverFilePath
    })
    ctx.body = result
  } else {
    // 其他请求显示404
    ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
  }
})

// set up
app.listen(3000, () => {
  console.log('start-quick is starting at port 3000')
})
