var express = require('express');
var router = express.Router();

const Database = require('better-sqlite3');
const db = new Database('./db/product-manager.db', {
    verbose: console.log, 
    fileMustExist: true
  });

/* GET home page. */
router.get('/', function(req, res, next) {

  const select = db.prepare(`
    SELECT id,
          product_name as productName,
          product_price as productPrice,
          image,
          urlSlug
      FROM products
    `);

    const products = select.all();

    // Query String

    const filter = req.query.filter;

    console.log(req.query.filter);

    // CONCAT('%', '?, '%')

    let stmt;
    let result;

    if (filter) {
      stmt = db.prepare(`
        SELECT id,
          product_name as productName,
          product_price as productPrice,
          image,
          urlSlug
      FROM products
      WHERE productName LIKE CONCAT('%', ?, '%')
        `);
        result = stmt.all(filter);
    } else {
      stmt = db.prepare(`
        SELECT id,
          product_name as productName,
          product_price as productPrice,
          image,
          urlSlug
      FROM products
        `);
        result = stmt.all();
    }

    const viewData = {
      title: "Produkter",
      products: products,
      products: result,
      /* product: row */
    };

    res.render('index', viewData);
});

module.exports = router;
