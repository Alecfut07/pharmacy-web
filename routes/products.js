var express = require('express');
var router = express.Router();

/* GET users listing. */
const axios = require('axios');

router.get('/', function(req, res, next) {
  axios.get('http://localhost:3001/products').then(resp => {
    
    res.render('products', { products: resp.data.data })
    console.log(resp);
  });
});

router.get('/:id', function(req, res, next) {
  const id = parseInt(req.params.id, 10);
  axios.get(`http://localhost:3001/products/${id}`).then(resp => {
    res.render('product-details', { product: resp.data.data })
  });
});

router.get('/update', function(req, res, next) {
  axios.get('http://localhost:3001/products'.then(resp => {
    res.render('update-product', { product: resp.data.data})
  }))
})

router.get('/new', function(req, res, next) {
  axios.get('http://localhost:3001/categories').then(resp => {
    res.render('new-product', { category: resp.data.data })
  });
});
module.exports = router;
