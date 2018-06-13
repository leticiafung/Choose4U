let http = require('http'),
  fs = require('fs'),
  express = require('express');
  //iconv = require('iconv-lite');



var app = express();
app.use(express.static(__dirname));
http.createServer(app).listen(5757,'127.0.0.1');
console.log('服务器在5757上运行');
