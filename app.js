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

// GET /products/:urlSlug (dynamisk route)
app.get('/products/:urlSlug', function(req, res) {

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

    res.render("product-details", {
      title: `${row.productName}`,
      product: row
    });
});

// GET /admin
app.get("/admin", function(req, res) {
  res.render("admin", {
    title: "Administration"
  });
});

// GET /admin-new-product
app.get("/new/product", function(req, res) { // GET-anrop, när man söker på sökvägen /new/product så körs funktionen
  
  res.render("admin-new-product", { // ejs.sidan med detta namn renderas
    title: "Ny produkt" // dynamisk text som kan användas på ejs-sidan (innanför tags)
  });
});

// POST /admin-new-product
// En funktion som kommer köras/anropas när det kommer in ett POST-anrop
// där URL:en är /new/products
app.post("/new/product", function (req, res) { // FETCH API, POST-anrop till backend, lägger till data från sidan till databasen

  const generateSlug = str =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  
  const product = { // här har vi skapat ett objekt för vår produkt
    productName: req.body.productName, // req-objekt som står för request
    SKU: req.body.SKU, // body innehåller informationen som skickades från klienten
    productPrice: req.body.productPrice,
    image: req.body.image,
    urlSlug: generateSlug(req.body.productName)
  };

  // prepare: förbereder databasen att lagra informationen i databasen
  // här lägger vi till data till databasen genom SQL-kommandot INSERT INTO
  db.prepare(`
    INSERT INTO products (product_name, SKU, product_price, image, urlSlug)
    VALUES (@productName, @SKU, @productPrice, @image, @urlSlug)
    `).run(product);

    // statuskod 201, en statuskod man returneras när något nytt har skapats 
    // upp på servern
    // instruera webbläsaren att hämta registreringssidan på nytt
    
    res.redirect("/admin");

    res.status(201).end(); 
});

// GET /api/products (JSON-format)
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