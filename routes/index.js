var express = require('express');
var router = express.Router();

const Database = require('better-sqlite3');
const db = new Database('./db/product-manager.db', {
    verbose: console.log, 
    fileMustExist: true
  });

// route for att hämta home-page
/* GET home page. */
router.get('/', function(req, res, next) {

  // Vi använder db-objektet för att skicka ett SQL-select-kommando
  // till databasen
  // för att hämta datan (produkterna) från databasen
  const select = db.prepare(`
    SELECT id,
          product_name as productName,
          product_price as productPrice,
          image,
          urlSlug
      FROM products
    `);

    const products = select.all();

    const viewData = {
      title: "Produkter", 
      products: products
    };
  
    // Här renderar/hämtar vi filen index.ejs
    res.render('index', viewData);
});

// ???
module.exports = router;
