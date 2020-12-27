var express = require('express');
var hbs = require('hbs');
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
  axios.all([
    axios.get(`http://localhost:3001/products/${id}`), 
    axios.get(`http://localhost:3001/categories`)
  ])
  .then(axios.spread((productResp, categoriesResp) => {
    const product = productResp.data.data;
    const categories = categoriesResp.data.data;
    res.render('product-details', {
      product,
      categories
    })
    // console.log('Product:', productResp);
    // console.log('Categories:', categoriesResp);
  }));
});

hbs.registerHelper('isSelectedCategory', function (category, selectedCategory) {
  return category.id === selectedCategory.id;
});

// router.get('/new', function(req, res, next) {
//   axios.get('http://localhost:3001/categories').then(resp => {
//     res.render('new-product', { category: resp.data.data })
//   });
// });
module.exports = router;
