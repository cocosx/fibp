function searchAfterGeoUnion(req,res,geoUnion,yobUnion) {
  var tmpExpire=10;
  client.INCR('tmp:counter', function(err6, leftInterTmp) {
    var leftInter='tmp:'+leftInterTmp;
    client.SINTERSTORE(leftInter,
      'user:sets:gender:'+req.user.lf,
      'user:sets:lf:'+req.user.gender,
      'user:sets:enabled',
      geoUnion,
      yobUnion,
      function(err,leftInterCard) {
        client.EXPIRE(leftInter,tmpExpire);
        client.INCR('tmp:counter', function(err7, mainSetTmp) {
          var mainSet = 'tmp:'+mainSetTmp;
          client.SDIFFSTORE(
            mainSet,
            leftInter,
            'user:'+req.user.id+':visited',
            function(err8, mainSetCard) {
  
            client.EXPIRE(mainSet, tmpExpire);
            if(mainSetCard>50) {
              //limit to 50 and call searchAfterTotal
            } else {
              client.SMEMBERS(mainSet, function(err9, total) {
                searchAfterTotal(req,res,total);
//...
