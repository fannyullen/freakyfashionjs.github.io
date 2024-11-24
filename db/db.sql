CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT,
    SKU TEXT UNIQUE,
    product_price TEXT,
    image TEXT,
    urlSlug TEXT UNIQUE
);

DROP TABLE products;

INSERT INTO products (
    product_name,
    SKU,
    product_price,
    image,
    urlSlug
) VALUES (
    'Svart t-shirt',
    'AA111',
    '199',
    'https://placehold.co/400x500'
);

INSERT INTO products (
    product_name,
    SKU,
    product_price,
    image
) VALUES (
    'Vit t-shirt',
    'BBB22',
    '199',
    'https://placehold.co/400x500'
);
INSERT INTO products (
    product_name,
    SKU,
    product_price,
    image
) VALUES (
    'Grön t-shirt',
    'CCC111',
    '199',
    'https://placehold.co/400x500'
);