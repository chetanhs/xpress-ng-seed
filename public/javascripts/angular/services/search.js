app.factory('search', function($resource) {
  var Search = $resource('/search', {}, {
    'query': {method: 'GET', params: {}, isArray: true}
  })
  return Search;
})