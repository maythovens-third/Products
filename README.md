# API Product Requests

## Get default amount of products, or get custom amount:
### GET:
  `/products` or `/products/:page/:amount`
### BEHAVIOR: 
  Retrieves the list of products.
### INPUT PARAMETERS:
 - Page (int). Selects the page of results to return. Default 1.
 - Count (int). Specifies how many results per page to return. Default 5.
### OUTPUT:
  An array of products with shallow field data, including:
   name, slogan, description, category, and default price.
   
### EXAMPLE:
```
[
  {
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": "140"
    },
  {
        "id": 2,
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "category": "Accessories",
        "default_price": "69"
    },
    // ...
]
```
## Get specfic product, with product features:
### GET:
  `/products/:product_id`
### BEHAVIOR:
  Returns all product level information for the specified product ID.
### INPUT PARAMETERS:
  Product ID (int). Required ID of the Product requested.
### OUTPUT:
  Returns an object of shallow field data of ONE product, and includes a list of features.
### EXAMPLE:
```
{
    "id": 11,
    "name": "Air Minis 250",
    "slogan": "Full court support",
    "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
    "category": "Basketball Shoes",
    "default_price": "0",
    "features": [
    {
            "feature": "Sole",
            "value": "Rubber"
        },
    {
            "feature": "Material",
            "value": "FullControlSkin"
        },
    // ...
    ],
}
```
## Get a product's styles:
### GET:
  `/products/:product_id/styles`
### BEHAVIOR:
  Returns all styles available for the specified product ID, as well as SKUs (stock-keeping units) for each style. 
### INPUT PARAMETERS:
  Product ID (int). Required ID of the Product requested.
### OUTPUT:
  An object containing details for each of the target's individual styles. `photos` and `skus` are nested structures.

### EXAMPLE:
```
{
    "product_id": "1",
    "results": [
  	{
            "style_id": 1,
            "name": "Forest Green & Black",
            "original_price": "140",
            "sale_price": "0",
            "default?": true,
            "photos": [
  			{
                    "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                    "url": "urlplaceholder/style_1_photo_number.jpg"
                },
  			{
                    "thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
                    "url": "urlplaceholder/style_1_photo_number.jpg"
                }
  			// ...
            ],
        "skus": {
                	"37": {
                    		"quantity": 8,
                    		"size": "XS"
                	},
                	"38": {
                    		"quantity": 16,
                    		"size": "S"
                	},
                	"39": {
                    		"quantity": 17,
                    		"size": "M"
                	},
            //...
            	}
    },
  {
        "style_id": 2,
        "name": "Desert Brown & Tan",
        "original_price": "140",
        "sale_price": "0",
        "default?": false,
        "photos": [
  			{
                    "thumbnail_url": "urlplaceholder/style_2_photo_number_thumbnail.jpg",
                    "url": "urlplaceholder/style_2_photo_number.jpg"
        }
      // ...
            ],
        "skus": {
                	"37": {
                    		"quantity": 8,
                    		"size": "XS"
                	},
                	"38": {
                    		"quantity": 16,
                    		"size": "S"
                	},
                	"39": {
                    		"quantity": 17,
                    		"size": "M"
                	},
            //...
            	}
    },
  // ...
}
```

## Get all related products of target product:
### GET:
`/products/:product_id/related`
### BEHAVIOR:
  Returns the IDs of products related to the product specified.
### INPUT PARAMETERS:
  Product ID (int). Required ID of the Product requested.
### OUTPUT:
  An array of product IDs (int) of all products related to the specified product.
### EXAMPLE:
```
[
  2,
  3,
  8,
  7
],
```


