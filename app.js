var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
var hostName = '127.0.0.1'
var port = 8888
//引入mongodb模块，获得客户端对象
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/gomall';

var { findData } = require('./db')

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

app.get('/get', function (req, res) {
  console.log('请求url：', req.path, '请求参数：', req.query)
  
  MongoClient.connect(DB_CONN_STR, function (err, db) {
    console.log("数据库连接成功！");
    //执行插入数据操作，调用自定义方法
    findData(db, function (result) {
      //显示结果
      console.log(result);
      res.send(JSON.stringify(result))
      //关闭数据库
      db.close();
    });
  });
})

app.post('/post', function (req, res) {
  console.log('请求参数：', req.body)
  var result = { code: 200, msg: 'post请求成功' }
  res.send(result)
})

app.listen(port, hostName, function () {
  console.log(`服务器运行在http://${hostName}:${port}`)
})
