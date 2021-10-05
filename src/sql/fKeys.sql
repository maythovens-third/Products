ALTER TABLE Related_Join ADD FOREIGN KEY (productId) REFERENCES Products (productId);
ALTER TABLE Related_Join ADD FOREIGN KEY (relatedId) REFERENCES Products (productId);
ALTER TABLE Product_Styles ADD FOREIGN KEY (productId) REFERENCES Products (productId);
ALTER TABLE Product_Features ADD FOREIGN KEY (productId) REFERENCES Products (productId);
ALTER TABLE Photos ADD FOREIGN KEY (styleId) REFERENCES Product_Styles (styleId);
ALTER TABLE SKUs ADD FOREIGN KEY (styleId) REFERENCES Product_Styles (styleId);