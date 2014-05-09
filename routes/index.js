var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/message', function(req, res){
  res.contentType("application/json");
  res.write(JSON.stringify({message: "Message from server"}));
  res.end();
})

module.exports = router;
