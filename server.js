var http = require('http');
var express = require('express');

var app = express();

var server = app.listen(1337, function() {

console.log('Listening on port 1337');
});

app.use(express.static('./'));
