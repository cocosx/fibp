async.whilst(function() {return !killed}, function(callback) {
  client.BLPOP('worker:email:p2', 'worker:email:p1', 10, 
    function(err,replies) {
    if(replies) {
      ses.send(JSON.parse(replies[1]), function(data) {
        console.log(data);
        callback();
      });
    } else {     
      callback();
    }
  });
}, function() {
  console.log('exit');
  process.exit();
});

process.on('SIGQUIT', function() {
  console.log('sigquit');
  killed=true;
});
