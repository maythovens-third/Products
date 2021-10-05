DROP TABLE IF EXISTS Products;

CREATE TABLE Products (
  productId INTEGER NULL DEFAULT NULL,
  name VARCHAR(128) NULL DEFAULT NULL,
  slogan VARCHAR(512) NULL DEFAULT NULL,
  description VARCHAR(512) NULL DEFAULT NULL,
  category VARCHAR(64) NULL DEFAULT NULL,
  defaultPrice INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (productId)
);

COPY Products(productId, name, slogan, description, category, defaultPrice)
FROM '/home/ubuntu/products.csv'
DELIMITER ','
CSV HEADER;



DROP TABLE IF EXISTS Product_Features;

CREATE TABLE Product_Features (
  id INTEGER NULL DEFAULT NULL,
  productId INTEGER NULL DEFAULT NULL,
  featureName VARCHAR (128) NULL DEFAULT NULL,
  featureValue VARCHAR (128) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

COPY Product_Features(id, productId, featureName, featureValue)
FROM '/home/ubuntu/features.csv'
DELIMITER ','
CSV HEADER;




DROP TABLE IF EXISTS Related_Join;

CREATE TABLE Related_Join (
  id INTEGER NULL DEFAULT NULL,
  productId INTEGER NULL DEFAULT NULL,
  relatedId INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

COPY Related_Join(id, productId, relatedId)
FROM '/home/ubuntu/related.csv'
DELIMITER ','
CSV HEADER;




DROP TABLE IF EXISTS Product_Styles;

CREATE TABLE Product_Styles (
  styleId INTEGER NULL DEFAULT NULL,
  productId INTEGER NULL DEFAULT NULL,
  name VARCHAR(128) NULL DEFAULT NULL,
  salePrice TEXT NULL DEFAULT NULL,
  originalPrice TEXT NULL DEFAULT NULL,
  defaultStyle BOOLEAN NOT NULL,
  PRIMARY KEY (styleId)
);

COPY Product_Styles(styleId, productId, name, salePrice, originalPrice, defaultStyle)
FROM '/home/ubuntu/styles.csv'
DELIMITER ','
CSV HEADER;




DROP TABLE IF EXISTS Photos;

CREATE TABLE Photos (
  id INTEGER NULL DEFAULT NULL,
  styleId INTEGER NULL DEFAULT NULL,
  url TEXT NULL DEFAULT NULL,
  thumbnail_url TEXT NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

COPY Photos(id, styleId, url, thumbnail_url)
FROM '/home/ubuntu/photos.csv'
DELIMITER ','
CSV HEADER;




DROP TABLE IF EXISTS SKUs;

CREATE TABLE SKUs (
  id INTEGER NULL DEFAULT NULL,
  styleId INTEGER NULL DEFAULT NULL,
  size TEXT NULL DEFAULT NULL,
  quantity INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

COPY SKUs(id, styleId, size, quantity)
FROM '/home/ubuntu/skus.csv'
DELIMITER ','
CSV HEADER;

DELETE FROM related_join WHERE relatedid = 0;