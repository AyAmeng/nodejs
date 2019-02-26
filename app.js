// https://chenshenhai.github.io/koa2-note/note/upload/busboy.html
// Koa
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const path = require('path')

const loggerGenerator = require('./middleware/logger-generator')
const loggerAsync = require('./middleware/logger-async')
const loggerUrl = require('./middleware/logger-url-parse')

const { uploadFile } = require('./utils/upload')

const app = new Koa()

const router = require('./router')

// Static relative path
const staticPath = './upload-files/files'
app.use(static(path.join(__dirname, staticPath)))

// MiddleWare logger
// app.use(convert(loggerGenerator()))
app.use(loggerAsync())
// app.use(loggerUrl())

// 使用ctx.body解析中间件
app.use(bodyParser())

// Middle route
// app.use(router.routes()).use(router.allowedMethods())

app.use(async ctx => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    // 当GET请求时候返回表单页面
    let html = `
      <h1>koa2 upload demo22222</h1>
      <form method="POST" action="/upload.json" enctype="multipart/form-data">
        <p>file upload</p>
        <span>picName:</span><input name="picName" type="text" /><br/>
        <input name="file" type="file" /><br/><br/>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if (ctx.url === '/upload.json' && ctx.method === 'POST') {
    // 上传文件请求处理
    let result = { success: false }
    let serverFilePath = path.join(__dirname, 'upload-files')

    // 上传文件事件
    result = await uploadFile(ctx, {
      fileType: 'files', // common or album
      path: serverFilePath
    })

    ctx.body = result
  } else {
    // 其他请求显示404
    return ctx
  }
})

// set up
app.listen(3000, () => {
  console.log('start-quick is starting at port 3000')
})
