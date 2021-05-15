# API Product Requests

### GET:
  /products 
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

### GET:
  /products/:product_id
### BEHAVIOR:
  Returns all product level information for a specified product id.
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

### GET:
  /products/:product_id/styles
### BEHAVIOR:
  Returns the all styles available for the given product.
### INPUT PARAMETERS:
  Product ID (int). Required ID of the Product requested.
### OUTPUT:


### EXAMPLE:
  GET /products/:product_id/related

