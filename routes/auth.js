var express = require('express');
var hbs = require('hbs');
var router = express.Router();
const axios = require('axios');
const { use } = require('./products');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
    res.locals.myMessage = req.flash('errorkey');
    res.render('login')
});

router.post('/login', function(req, res, next) {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  axios.post('http://localhost:3001/auth/sign_in', {
    username: username,
    password: password
  }).then((resp) => {
    const user = {
      username,
      password,
    }
    req.cookies.userId = resp.data.data.id;
    req.session.user = user;
    res.redirect('/products');
  }).catch((err) => {
    console.log(err);
    req.flash('errorkey', 'Something went wrong');
    res.redirect('/auth/login');
  });
})

router.get('/logout', function (req, res, next) {
  res.clearCookie('connect.sid');
  // req.session = null;
  req.session.destroy();
  res.redirect('/auth/login');
})

module.exports = router;
