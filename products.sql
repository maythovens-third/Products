-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Products'
--
-- ---

DROP TABLE IF EXISTS Products;

CREATE TABLE Products (
  productId INTEGER NULL DEFAULT NULL,
  name VARCHAR(512) NULL DEFAULT NULL,
  slogan VARCHAR(512) NULL DEFAULT NULL,
  description VARCHAR(512) NULL DEFAULT NULL,
  category INTEGER NULL DEFAULT NULL,
  defaultPrice INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (productId)
);

-- ---
-- Table 'Categories'
--
-- ---

DROP TABLE IF EXISTS Categories;

CREATE TABLE Categories (
  id SERIAL,
  category VARCHAR(512) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Related_Join'
--
-- ---

DROP TABLE IF EXISTS Related_Join;

CREATE TABLE Related_Join (
  id INTEGER NULL DEFAULT NULL,
  productId INTEGER NULL DEFAULT NULL,
  relatedId INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
  --foreign key
);

-- ---
-- Table 'Product_Styles'
--
-- ---

DROP TABLE IF EXISTS Product_Styles;

CREATE TABLE Product_Styles (
  styleId INTEGER NULL DEFAULT NULL,
  productId INTEGER NULL DEFAULT NULL,
  _name VARCHAR(512) NULL DEFAULT NULL,
  originalPrice INTEGER NULL DEFAULT NULL,
  salePrice INTEGER NULL DEFAULT NULL,
  "default?" INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (styleId)
);

-- ---
-- Table 'Product_Features'
--
-- ---

DROP TABLE IF EXISTS Product_Features;

CREATE TABLE Product_Features (
  id SERIAL,
  productId INTEGER NULL DEFAULT NULL,
  featureNameId INTEGER NULL DEFAULT NULL,
  featureValueId INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Feature_Names'
--
-- ---

DROP TABLE IF EXISTS Feature_Names;

CREATE TABLE Feature_Names (
  id SERIAL,
  name VARCHAR(512) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'photos'
--
-- ---

DROP TABLE IF EXISTS Photos;

CREATE TABLE Photos (
  id SERIAL,
  _url VARCHAR NULL DEFAULT NULL,
  thumbnnail_url VARCHAR NULL DEFAULT NULL,
  styleId INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'skus'
--
-- ---

DROP TABLE IF EXISTS SKUs;

CREATE TABLE SKUs (
  skuId INTEGER NULL DEFAULT NULL,
  styleId INTEGER NULL DEFAULT NULL,
  quantity INTEGER NULL DEFAULT NULL,
  size VARCHAR(512) NULL DEFAULT NULL,
  PRIMARY KEY (skuId)
);

-- ---
-- Table 'Feature_Values'
--
-- ---

DROP TABLE IF EXISTS Feature_Values;

CREATE TABLE Feature_Values (
  id SERIAL,
  _value VARCHAR(512) NULL DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE Products ADD FOREIGN KEY (category) REFERENCES Categories (id);
ALTER TABLE Related_Join ADD FOREIGN KEY (productId) REFERENCES Products (productId);
ALTER TABLE Related_Join ADD FOREIGN KEY (relatedId) REFERENCES Products (productId);
ALTER TABLE Product_Styles ADD FOREIGN KEY (productId) REFERENCES Products (productId);
ALTER TABLE Product_Features ADD FOREIGN KEY (productId) REFERENCES Products (productId);
ALTER TABLE Product_Features ADD FOREIGN KEY (featureNameId) REFERENCES Feature_Names (id);
ALTER TABLE Product_Features ADD FOREIGN KEY (featureValueId) REFERENCES Feature_Values (id);
ALTER TABLE photos ADD FOREIGN KEY (styleId) REFERENCES Product_Styles (styleId);
ALTER TABLE skus ADD FOREIGN KEY (styleId) REFERENCES Product_Styles (styleId);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Products` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Categories` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Related_Join` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Product_Styles` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Product_Features` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Feature_Names` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `skus` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Feature_Values` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Products` (`productId`,`name`,`slogan`,`description`,`category`,`defaultPrice`) VALUES
-- ('','','','','','');
-- INSERT INTO `Categories` (`id`,`category`) VALUES
-- ('','');
-- INSERT INTO `Related_Join` (`id`,`productId`,`relatedId`) VALUES
-- ('','','');
-- INSERT INTO `Product_Styles` (`styleId`,`productId`,`name`,`originalPrice`,`salePrice`,`"default?"`) VALUES
-- ('','','','','','');
-- INSERT INTO `Product_Features` (`id`,`productId`,`featureNameId`,`featureValueId`) VALUES
-- ('','','','');
-- INSERT INTO `Feature_Names` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `photos` (`id`,`URL`,`thumbnnail URL`,`styleId`) VALUES
-- ('','','','');
-- INSERT INTO `skus` (`skuId`,`styleId`,`quantity`,`size`) VALUES
-- ('','','','');
-- INSERT INTO `Feature_Values` (`id`,`value`) VALUES
-- ('','');