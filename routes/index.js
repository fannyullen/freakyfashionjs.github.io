var express = require('express');
var router = express.Router();
const Database = require('better-sqlite3');
const db = new Database('./db/product-manager.db', {
    verbose: console.log, 
    fileMustExist: true
  });


/* GET home page. */
router.get('/', function(req, res, next) {

  // för att hämta datan (produkterna) från databasen
  const stmt = db.prepare(`
    SELECT id,
          product_name as productName,
          product_price as productPrice,
          image
      FROM products
    `);

    const products = stmt.all();

    console.log(products);

    const viewData = {
      title: "Products", 
      products: products
    };
  
    res.render('index', viewData);
});

module.exports = router;
