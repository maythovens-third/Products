DROP INDEX productIdIndex;
CREATE INDEX productIdIndex ON product_styles(productId);
CLUSTER product_styles USING productIdIndex;

DROP INDEX relatedStylePhotos;
CREATE INDEX relatedStylePhotos ON photos(styleId);
CLUSTER photos USING relatedStylePhotos;

DROP INDEX relatedStyleSkus;
CREATE INDEX relatedStyleSkus ON skus(styleId);
CLUSTER SKUs USING relatedStyleSkus;

DROP INDEX productRootTableIndex;
CREATE INDEX productRootTableIndex ON products(productId);

DROP INDEX relatedJoinProductIdIndex;
CREATE INDEX relatedJoinProductIdIndex ON related_join(productId);
CLUSTER related_join USING relatedJoinProductIdIndex;