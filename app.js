
/**
 * Module dependencies.
 */

var express = require('express');
// var routes = require('./routes');  // del
// var user = require('./routes/user');  // del
var http = require('http');
var path = require('path');
var ejs = require('ejs'); // add

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.html', ejs.__express); // add
app.set('view engine', 'html'); // upd 替换文件扩展名ejs为html

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'app'))); // upd 更改资源路径

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);  // del
// app.get('/users', user.list);  // del

// add angular启动页
app.get('/', function (req, res) {
    res.sendfile('app/index.html')
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
