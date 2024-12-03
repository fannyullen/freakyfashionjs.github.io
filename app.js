var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const Database = require('better-sqlite3');
const db = new Database('./db/product-manager.db', {
  verbose: console.log,
  fileMustExist: true
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// GET /products/:urlSlug
app.get('/products/:urlSlug', function(req, res) {

  // generera urlSlug
  const urlSlug = req.params.urlSlug;

  const row = db.prepare(`
    SELECT id,
      product_name as productName,
      product_price as productPrice,
      image,
      urlSlug
    FROM products
    WHERE urlSlug = ?
    `).get(urlSlug);

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
        title: `${row.productName}`, 
        products: products,
        product: row
      };
    
      res.render('product-details', viewData);
});

// GET /search-result
app.get('/search/:urlSlug', function(req, res) {

  const urlSlug = req.params.urlSlug;

  const row = db.prepare(`
    SELECT id,
      product_name as productName,
      product_price as productPrice,
      image,
      urlSlug
    FROM products
    WHERE urlSlug = ?
    `).get(urlSlug);

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
        /* title: `${row.productName}` */
        products: products,
        products: result,
        product: row
      };
    
      res.render('search-result', viewData);
});


// GET /admin
app.get("/admin", function(req, res) {
  res.render("admin", {
    title: "Administration"
  });
});

// GET /admin-new-product
app.get("/admin/new", function(req, res) {
  
  res.render("admin-new-product", {
    title: "Ny produkt"
  });
});

// GET /api/products
// API endpoint
app.get('/api/products', function(req, res, next) {

  const products = db
    .prepare(`
      SELECT id,
        product_name AS productName,
        SKU AS SKU,
        product_price AS productPrice,
        image AS image
      FROM products
      `).all();

  res.json(products);
});

// POST /admin-new-product
  app.post("/admin/new", function (req, res, next) {

  const generateSlug = str =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  
  const product = {
    productName: req.body.productName,
    SKU: req.body.SKU,
    productPrice: req.body.productPrice,
    image: req.body.image,
    urlSlug: generateSlug(req.body.productName)
  };

  db.prepare(`
    INSERT INTO products (product_name, SKU, product_price, image, urlSlug)
    VALUES (@productName, @SKU, @productPrice, @image, @urlSlug)
    `).run(product);

    res.status(201).end();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// funktion som behövs för att generera urlSlug
// tar in en textsträng som kommer vara titeln

/* function generateSlug(title) {
  return title
      .toLowerCase()                    // Convert to lowercase
      .trim()                           // Tar bort mellanslag och white spaces före och efter
      .replace(/[^a-z0-9\s-]/g, '')     // Ersätter specialtecken med giltiga tecken
      .replace(/\s+/g, '-')
      .replace(/-+/g, '');
} */