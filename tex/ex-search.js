      for(var i=yearTo;i<=yearFrom;i++) {
        yobSets.push('user:sets:yob:'+i);
      }
      client.INCR('tmp:counter', function(err1, yobUnionTmp) {
        var yobUnion='tmp:'+yobUnionTmp;
        var params1=[yobUnion];
        params1=params1.concat(yobSets);
        client.SUNIONSTORE(params1, function(err2, yobUnionCard) {
          client.EXPIRE(yobUnion,tmpExpire);
          var geoUnion='';
          if(area==1) {
            geoUnion='user:sets:geo:'+req.user.owoeid;
            searchAfterGeoUnion(req,res,geoUnion,yobUnion);
          } else if(area==2) {
            client.SMEMBERS('geo:sets:adjo:'+req.user.owoeid,
              function(err3, adjSet){
              if(adjSet.length>0) {
                client.INCR('tmp:counter', function(err4, geoUnionTmp) {
                  geoUnion='tmp:'+geoUnionTmp;
                  var params2=[geoUnion, 'user:sets:geo:'+req.user.owoeid];
                  for(var adj in adjSet) {
                    params2.push('user:sets:geo:'+adjSet[adj]);
                  }
                  client.SUNIONSTORE(params2, function(err, geoUnionCard) {
                    client.EXPIRE(geoUnion,tmpExpire);
                    searchAfterGeoUnion(req,res,geoUnion,yobUnion);
                  });
                });
              } else {
                geoUnion='user:sets:geo:'+req.user.owoeid;
              }
            });
            //...
