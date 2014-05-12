var express = require('express');
var router = express.Router();
var search = require('../services/search');

router.get('/search', function(req, res){
  res.contentType("application/json");
  search.query(req, res, function(result){
    res.write(JSON.stringify(result));
    res.end();
  });
});

/* GET home page. */
router.get('/', function(req, res) {
  //Create mock data if not already initialized.
  //TODO: Remove this once a DB is setup
  if(typeof req.session.db === "undefined"){
    req.session.db =  search.getSeedData(20);
    req.session.save();
  }

  res.render('index', { title: 'Job Portal', active: 'home' });
});

/* Get about page*/
router.get('/about', function(req, res) {
  res.render('about', { title: 'About | Job Portal', active: 'about' });
});

module.exports = router;
