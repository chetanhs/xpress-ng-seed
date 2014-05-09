filterModule.filter('capitalize', function () {
  return  function(str){
    var tokens = str.split(" ");
    return _.map(tokens, function(t){ return t[0].toUpperCase()+t.substr(1); }).join(" ");
  }
})