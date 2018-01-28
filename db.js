//引入mongodb模块，获得客户端对象
// var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR = 'mongodb://localhost:27017/gomall';

//添加数据
var insertData = function (db, callback) {
  //获得指定的集合 
  var collection = db.collection('users');
  //插入数据
  var data = [{ _id: 7, "name": 'rose', "age": 21 }, { _id: 8, "name": 'mark', "age": 22 }];
  collection.insert(data, function (err, result) {
    //如果存在错误
    if (err) return console.log('Error:' + err);
    //调用传入的回调方法，将操作结果返回
    callback(result);
  });
}

//修改数据
var updateData = function (db, callback) {
  //获得指定的集合 
  var collection = db.collection('users');
  //要修改数据的条件，>=10岁的用户
  var where = { age: { "$gte": 10 } };
  //要修改的结果
  var set = { $set: { age: 95 } };
  collection.updateMany(where, set, function (err, result) {
    //如果存在错误
    if (err) return console.log('Error:' + err);
    //调用传入的回调方法，将操作结果返回
    callback(result);
  });
}

//查询数据
var findData = function (db, callback) {
  //获得指定的集合 
  var collection = db.collection('users');
  //要查询数据的条件，<=100岁的用户
  var where = { age: { "$lte": 100 } };
  //要显示的字段
  var set = { name: 1, age: 1 };
  collection.find(where, set).toArray(function (err, result) {
    //如果存在错误
    if (err) return console.log('Error:' + err);
    //调用传入的回调方法，将操作结果返回
    callback(result);
  });
}

//删除数据
var delData = function (db, callback) {
  //获得指定的集合 
  var collection = db.collection('users');
  //要删除数据的条件，_id>7的用户删除
  var where = { _id: { "$gt": 7 } };
  collection.remove(where, function (err, result) {
    //如果存在错误
    if (err) return console.log('Error:' + err);
    //调用传入的回调方法，将操作结果返回
    callback(result);
  });
}

//使用客户端连接数据，并指定完成时的回调方法
// MongoClient.connect(DB_CONN_STR, function (err, db) {
//   console.log("连接成功！");
//   //执行插入数据操作，调用自定义方法
//   delData(db, function (result) {
//     //显示结果
//     console.log(result);
//     //关闭数据库
//     db.close();
//   });
// });

module.exports={
  updateData,
  delData,
  updateData,
  findData
}