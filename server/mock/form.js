const a = {
  // 基础信息部分
  teacher: 0, // 老师
  // instrument: 'string', // 原有删除 注意
  // shiting_memo: 'string', // 原有删除 注意
  extend_memo: 'string', // 未知
  is_twice: 0, // 是否二次到店
  name: 'string', // 姓名
  phone: 'string', // 联系方式
  gender: 0, // 性别
  jindu_memo: 'string', // 沟通沟通记录
  status: 'string', // 状态 == 0 -4  注意新增 一个 关闭的状态
  age_range: 'string', // 年龄段
  seller: 'string', // 销售渠道
  // course: "string", // 原有调整
  source: 'string', // 来源

  // 新增字段
  add_time: 'string', // 新增时间 前端去除 后端保留

  // 课程
  course: {
    course_date: '2019-02-19', //预约时间 或者 没有 传 空字符哈
    course_time: '09:00-10:00', //预约日期
    instrument_type: '', //乐器类型
    teacher: '', // 课程老师
    shiting_remark: '' // 试听记录
  },
  // 订单
  orders: [
    {
      pay_type: 'string', //支付类型
      post_script: 'string', // 保留
      order_mount: 0, // 价格// 费用
      goods_type: 'string', // 商品类型  == 课程/乐器 0/1
      goods_model: 'string', // 型号/类型
      add_time: 'string', // 。。保留
      order_memo: 'string' //订单备注
    }
  ],

  // 关闭原因
  reason_desc: '' //订单关闭原因
}

// 1. 日程非配列表 点进去 时间日期 老师 不可更改
// 2. 日程非配列表 1. 添加试听课程/占课 2. 新建接口
// 3. 试听管理 新晋预约 不需要 试听日期和时间
// 4. 新建 是 post// 5. 更新 put// 6。 查询 get
// 7. 关闭 put  需要新增
