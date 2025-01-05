
var http = require('http');

http.createServer(function (req,res)
{
// res.write('<h1> hello from node.js server </h1>');
// res.write(' hello from node.js server 2 ');

var fs = require('fs');
fs.readFile('demofile1.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    console.log(data)
   return res.end();
  });


}).listen(5200)

// var myFunction = require('./fun')
// console.log(myFunction(10,20))