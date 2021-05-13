DROP INDEX productIdIndex;
CREATE INDEX productIdIndex ON product_styles(productId);
CLUSTER product_styles USING productIdIndex;

DROP INDEX relatedStylePhotos;
CREATE INDEX relatedStylePhotos ON photos(styleId);
CLUSTER photos USING relatedStylePhotos;

DROP INDEX relatedStyleSkus;
CREATE INDEX relatedStyleSkus ON skus(styleId);
CLUSTER SKUs USING relatedStyleSkus;
