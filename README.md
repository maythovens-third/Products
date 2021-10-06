# Atelier Product API Module

The Atelier Product API provides fashion product data to the eCommerce site PROJECT:Catwalk. The API is responsible for retrieving data from an instance of Postgres, as well shaping the data so that it may be consumed by the client. The API is built with ExpressJS, which is a Node.js application framework. It was requested that this API meet and sustain approximately 1000 requests per second.

This API was built in one and a half weeks in May 2021, and deployed on AWS.

## Contents
  * [Stack](#Stack)
  * [Setup](#Setup)
    * [Server](#Server)
    * [Test Database](#Test-Database)
    * [Unit Testing](#Unit-Testing)
    * [NGINX Load Balancer](#NGINX-Load-Balancer-optional)
  * [Schema Diagram](#Schema-Diagram)
  * [Endpoints](#Endpoints)
  * [Load Testing and Optimizations](#Load-Testing-and-Optimizations)
  * [Future Optimizations](#Future-Optimizations)

## Stack

- Express.js - server
- NGINX - load balancing and static caching
- PostgresQL - database
- K6 - load testing
- Jest/Supertest - endpoint unit testing

## Setup

### Server

The following instructions will help get the server up and running:

- `npm install` - installs app and development dependencies
- `npm dev` - start the app with nodemon, or start normally with `npm start`
- In the `db` folder, view the `PG` connection object in `db.js`. Input your Postgres credentials either here or `export` them into environment variables. The database value can be left as `products`. The following snippet is what to look for:

```js
const client = new Client({
  user: (process.env.DB_USERNAME || 'postgres'),
  host: process.env.HOST,
  database: 'products',
  password: (process.env.DB_PASSWORD || '1234'),
  port: 5432,
})
```

### Test Database

In order for the unit tests to work and for the API to be demoed, the server must be connected to a test database. Mock data is provided in the `truncDemoData` folder and should be loaded into Postgres with the following instructions:

- Install Postgres.
- Find the `sql` folder and open `copyProductsLocal.sql`. You will need to change the file paths of all the `FROM` selectors:

```sql
COPY Products(productId, name, slogan, description, category, defaultPrice)
FROM '../truncDemoData/product.csv'
DELIMITER ','
CSV HEADER;
```

- Direct each `FROM` to their respective file in the `truncDemoData` folder. There are 6 CSV files total.
- Load `copyProductsLocal.sql` into Postgres to create and insert mock data into tables.
- Load `fKeys.sql` to create the foreign keys.
- Finally, load `createIndex.sql` to create indexes and cluster indexes on the tables.
- The API should now be able to retrieve data from the test database.

### Unit Testing

Once the server is hooked up to the database and the mock data has been inserted into the tables, the included endpoint unit tests can be executed. 

- `npm test` to run endpoint unit testing. 

### NGINX Load Balancer (optional)

Included in the `NGINX` folder is a configuration file for the NGINX load balancer. All it needs are the IP addresses of the API's server instances.

- Install NGINX.
- Open the `nginx.conf` and add the IP addresses of each server instance that will be communicating with the load balancer.
- Direct requests to port 80.

## Schema Diagram

![schemaDiagram](https://github.com/maythovens-third/Products/blob/main/readMeImages/schemaDiagram.png)

## Endpoints

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

Deployment of multiple Express server instances increases the load the system is able to handle, but results from K6 testing indicate that scaling provides no meaningful increase in performance beyond 3 servers for the tests used. The tests stressed the system with up to 3000 virtual users with one request each.

A single server resulted in a 63% success rate.
![single-server](https://github.com/maythovens-third/Products/blob/main/readMeImages/1-server.png)

Two servers dramatically increases the success rate.
![2 servers](https://github.com/maythovens-third/Products/blob/main/readMeImages/2-servers.png)

A third server increases the success rate, but not as much as the second server.
![3 servers](https://github.com/maythovens-third/Products/blob/main/readMeImages/3-servers.png)

A fourth server shows no discernable increase in performance.
![4 servers](https://github.com/maythovens-third/Products/blob/main/readMeImages/4-servers.png)

A fifth was tested, but results do not change.
![5 servers](https://github.com/maythovens-third/Products/blob/main/readMeImages/5-servers.png)

### Cluster Indexing

A feature of PostgresQL, cluster indexing rewrites all related indexes to be physically near each other on disk. This resulted in an almost unnoticeable increase in performance.

## Future Optimizations

### Vertical Scaling (financial constraint)

Because the EC2.micro employed provides Postgres a single processor, the instance of Postgres used in the tests was tuned to employ a single worker. If the financial constraints were lifted, better hardware would allow Postgres to be tuned to employ more workers, increasing the performance of the system.

### Database Sharding (time constraint)

Investigation reveals that database sharding divides the database into automous partitions. This means they do not share any data or computing resources. If each partition is hosted on its own instance, this affords each instance at least its own single worker. This may allow requests made on different segments of the database to be handled asynchronously, which may improve performance.




