var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res
    .cookie('test', 123)
    .render('index', {
      title: 'Express',
      subtitle: 'JS',
  });
});

router.get('/sessions', function(req, res, next) {
  if (req.session.count >= 0) {
    req.session.count += 1;
  } else {
    req.session.count = 0;
  }
  res.send(`Session ID: ${req.sessionID}; Session count: ${req.session.count}`);
});


router.get('/tacos', function(req, res, next) {
  console.log(req.cookies);
  res
    .render('index', {
      title: 'Express',
      subtitle: 'JS',
  });
});

router.get('/flash', function(req, res, next) {
  res.render('flash');
  req.flash('success', 'You have signed up successfully');
});

module.exports = router;
