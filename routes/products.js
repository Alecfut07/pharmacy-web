var express = require('express');
var hbs = require('hbs');
var router = express.Router();

/* GET users listing. */
const axios = require('axios');

const sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies["connect.sid"]) {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

router.get('/', sessionChecker, function(req, res, next) {
  axios.get('http://localhost:3001/products').then(resp => {
    res.render('products', { products: resp.data.data })
    // console.log(resp);
  });
});

router.get('/new', function(req, res, next) {
  axios.get('http://localhost:3001/categories').then(resp => {
    res.render('create-product', { categories: resp.data.data })
    console.log(resp);
  });
});

router.post('/create', function(req, res, next) {
  const { newNameProduct, newCategoryId, newPriceProduct } = req.body;
  console.log(newNameProduct);
  console.log(newCategoryId);
  console.log(newPriceProduct);
  axios.post(`http://localhost:3001/products`, {
    name: newNameProduct,
    details: 'asdf',
    category_id: newCategoryId,
    stock: 123,
    stock_min: 50,
    stock_max: 1000,
    price: newPriceProduct,
  }).then((resp) => {
    res.redirect('/products');
  }).catch((err) => {
    console.log(err);
  });
});

router.post('/update', function(req, res, next) {
  const { productId, nameProduct, categoryId, priceProduct } = req.body;
  console.log(productId);
  console.log(nameProduct);
  console.log(categoryId);
  console.log(priceProduct);
  axios.put(`http://localhost:3001/products/${productId}`, {
    name: nameProduct,
    details: 'asdf',
    category_id: categoryId,
    price: priceProduct,
  }).then((resp) => {
    res.redirect('/products');
  }).catch((err) => {
    console.log(err);
  });
});

router.get('/:id', sessionChecker, function(req, res, next) {
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
  }))
  .catch((err) => {
    console.log("aquí")
    console.log(err);
  });
});

hbs.registerHelper('isSelectedCategory', function (category, selectedCategory) {
  return category.id === selectedCategory.id;
});

module.exports = router;
