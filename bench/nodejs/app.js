var app = require('express').createServer();
var util = require('util');

app.get('/add', function(req, res){
  var x=parseInt(req.param('a'))+parseInt(req.param('b'));
  res.send(x.toString());
});

app.get('/sleep', function(req, res){
  var ms=parseInt(req.param('ms'));
  setTimeout(function() {
    res.send(util.format('Slept %s miliseconds.', ms));
  }, ms);
});

app.listen(3000);
