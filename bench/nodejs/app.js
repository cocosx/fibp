var app = require('express').createServer();

app.get('/', function(req, res){
  var x=parseInt(req.param('a'))+parseInt(req.param('b'));
  res.send(x.toString());
});

app.listen(3000);
