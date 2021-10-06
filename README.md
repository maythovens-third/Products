# Atelier Product API Module

The Atelier Product API provides fashion product data to the eCommerce site PROJECT:Catwalk. The API is responsible for retrieving data from an instance of Postgres, as well shaping the data so that it may be consumed by the client. The API is built with ExpressJS, which is a Node.js application framework. It was requested that this API meet and sustain approximately 1000 requests per second.

## Contents:
  * [Stack](#Stack)
  * [Endpoints](#Endpoints)
  * [Load Testing and Optimizations](#Load-Testing-and-Optimizations)
  * [Optimizations Beyond Existing Constraints](#Optimizations-beyond-existing-constraints)

## Stack:

- Express.js - server
- NGINX - load balancing and static caching
- PostgresQL - database
- K6 - load testing
- Jest/Supertest - endpoint unit testing

# Endpoints

Endpoints that need parameters are protected by a guard clause to keep the server from crashing:

```js
function validateParameters() {
  let args = Array.from(arguments);
  return args.every(arg => {
    return parseInt(arg) && parseInt(arg) >= 1;
  });
};

if(!validateParameters(page, amount)) return res.status(400).send('Invalid parameters.');
```

## Get default amount of products, or get custom amount:

### GET:

  `/products` or `/products/:page&:amount`
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

  - Product ID (int). Required ID of the Product requested.

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

  - Product ID (int). Required ID of the Product requested.

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
```

## Get all related products of target product:

### GET:

`/products/:product_id/related`

### BEHAVIOR:

  Returns the IDs of products related to the product specified.

### INPUT PARAMETERS:

  - Product ID (int). Required ID of the Product requested.

### OUTPUT:

  An array of all products and their details related to the specified product.

### EXAMPLE:

```
[
    {
        "productid": 2,
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "category": "Accessories",
        "defaultprice": 69
    },
    {
        "productid": 3,
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
        "category": "Pants",
        "defaultprice": 40
    },
    {
        "productid": 7,
        "name": "Blues Suede Shoes",
        "slogan": "2019 Stanley Cup Limited Edition",
        "description": "Touch down in the land of the Delta Blues in the middle of the pouring rain",
        "category": "Dress Shoes",
        "defaultprice": 120
    },
    {
        "productid": 8,
        "name": "YEasy 350",
        "slogan": "Just jumped over jumpman",
        "description": "These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.",
        "category": "Kicks",
        "defaultprice": 450
    }
]
```

# Load Testing and Optimizations

K6 load testing was employed to locate where optimizations could be made. All tests were performed while each component was deployed on EC2.micros.

K6 testing stressed the NGINX load balancer with up to 3000 requests per second. The optimizations made with given constraints are as follows:

### Static Caching via NGINX Load Balancer Instance

Caching of server responses dramatically improved the response time for each request made to the load balancer. Responses are cached locally on the load balancer's EC2.

### Horizontal Scaling

Deployment of multiple Express server instances increases the load the system is able to handle, but results from K6 testing indicate that replication provides no meaningful increase in performance beyond 3 servers at 1000RPS.

### Cluster Indexing

A feature of PostgresQL, cluster indexing rewrites all related indexes to be physically near each other on disk. This resulted in an almost unnoticeable increase in performance.

## Optimizations Beyond Existing Constraints

### Vertical Scaling (financial constraint)

Because the EC2.micro employed provides Postgres a single processor, Postgres is tuned to employ a single worker. If the financial constraints were lifted, better hardware would allow Postgres to be tuned to employ more workers, increasing the performance of the system.

### Database Sharding (time constraint)

Investigation reveals that database sharding divides the database into automous partitions. This means they do not share any data or computing resources. If each partition is hosted on its own instance, this affords each instance at least its own single worker. This may allow requests made on different segments of the database to be handled asynchronously, which may improve performance.




