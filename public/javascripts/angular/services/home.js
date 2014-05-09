app.factory('home', function($resource) {
  var Home = $resource('/:action', {action: '@action'}, {
    'getMessage': {method: 'GET', params: {action: 'message'}}
  })
  return Home;
})