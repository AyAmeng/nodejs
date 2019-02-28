const path = require('path')
const Koa = require('koa')
const convert = require('koa-convert')
const views = require('koa-views')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const koaLogger = require('koa-logger')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')

const config = require('./../config/index')
const routers = require('./routers/index')

const cors = require('./middleware/cors')

const app = new Koa()

// session存储配置
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST
}

// Cors Header && Options Handler
app.use(cors())

// 配置session中间件
app.use(
  session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
  })
)

// 配置控制台日志中间件
app.use(convert(koaLogger()))

// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(convert(koaStatic(path.join(__dirname, './../static/output'))))

// 配置服务端模板渲染引擎中间件
app.use(
  views(path.join(__dirname, './views'), {
    extension: 'ejs'
  })
)

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen(config.dev.PORT)

console.log(`the server is start at port ${config.dev.PORT}`)
