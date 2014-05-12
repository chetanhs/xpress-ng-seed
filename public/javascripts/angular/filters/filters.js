filterModule.filter('capitalize', function () {
  return  function(str){
    var tokens = str.split(" ");
    return _.map(tokens, function(t){ return t[0].toUpperCase()+t.substr(1); }).join(" ");
  }
})

filterModule.filter('truncateJd', function () {
  return  function(str, scope, length){
    return str.length > length ? (str.substr(0, length) + ( ' <a href="/job/'+scope.job.id+'">more >></a>' )) : str;
  }
})

filterModule.filter('highlight', function(capitalizeFilter){
  return function(str, scope, isKeyword){
    return scope.q && scope.q != '' ? str.replace(new RegExp("\\b"+scope.q, "gi"), '<span class="hit">'+(isKeyword ? capitalizeFilter(scope.q) : scope.q)+'</span>') : isKeyword ? capitalizeFilter(str) : str;
  }
})