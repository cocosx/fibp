client.INCRBY('user:counters:id', Math.floor(Math.random()*50+1),
  function(err,replies) {
  var id = replies;
  var multi=client.multi();
  //...
  multi.HMSET('user:'+id, 'id', id, 'email', email,
    'sechash', sechash.strongHashSync('sha1', pass1, null, 5),
    'activated', false, 'vercode', vercode,
    'cwoeid', 0, 'swoeid', 0, 'owoeid', 0,
    'helpMode', true);
  multi.SADD('user:sets:email', email);
  multi.SADD('user:sets:id', id);
  multi.SADD('user:'+id+':visited', id);
  multi.HSET('user:hashes:email2id', email, id);
  //...
  multi.exec(function(err, replies) {
    //...
  });
});

