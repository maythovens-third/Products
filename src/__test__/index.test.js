const request = require('supertest');
const app = require('../server/app.js');
const { client } = require('../db/db.js');

describe('getProductStyles -- /product/:product_id/styles', () => {
  it('returns status code 200 when passed valid parameters', async () => {
    const res = await request(app).get('/products/1/styles');
    expect(res.status).toBe(200);
  });

  it('returns status code 400 when passed invalid parameters', async () => {
    const res = await request(app).get('/products/asdf/styles');
    expect(res.status).toBe(400);
  });

  it('returns styles of the product_id passed in', async () => {
    const res = await request(app).get('/products/1/styles');
    let styleIDs = res.body.map(style => style.styleid);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toHaveLength(6);
    expect(styleIDs).toEqual([1,2,3,4,5,6]);
    expect(res.body[5].name).toBe("Dark Grey & Black");
  });
});

describe('getRelatedProducts -- /product/:product_id/related', () => {
  it('returns status code 200 when passed valid parameters', async () => {
    const res = await request(app).get('/products/1/related');
    expect(res.status).toBe(200);
  });

  it('returns status code 400 when passed invalid parameters', async () => {
    const res = await request(app).get('/products/asdf/related');
    expect(res.status).toBe(400);
  });

  it('returns products related to the product_id passed in', async () => {
    const res = await request(app).get('/products/1/related');
    let productIds = res.body.map(product => product.productid);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toHaveLength(4);
    expect(productIds).toEqual([2,3,7,8]);
    expect(res.body[2].name).toBe("Blues Suede Shoes");
  });
});

describe('getCustomAmount -- /products/:page&:amount', () => {
  it('returns status code 200 when passed valid parameters', async () => {
    const res = await request(app).get('/products/1&1');
    expect(res.status).toBe(200);
  });

  it('returns second page of 5 items if page = 2 and amount = 5', async () => {
    const res = await request(app).get('/products/2&5');
    let productIDs = res.body.map(product => product.productid);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toHaveLength(5);
    expect(productIDs).toEqual([6,7,8,9,10]);
  });

  it('returns status code 400 when passed invalid parameters', async () => {
    const res = await request(app).get('/products/asdf&-7');
    expect(res.status).toBe(400);
  });
});

describe('getSpecificProduct -- /products/:product_id', () => {
  it('returns status code 200', async () => {
    const res = await request(app).get('/products/1');
    expect(res.status).toBe(200);
  });

  it('returns details of product_id 1', async () => {
    const res = await request(app).get('/products/1');
    expect(res.body.productid).toBe(1);
    expect(res.body.name).toBe('Camo Onesie');
    expect(res.body.defaultprice).toBe(140);
    expect(res.body.category).toBe('Jackets');
  });

  it('returns status code 400 if product_id is invalid', async () => {
    const res = await request(app).get('/products/-1');
    expect(res.status).toBe(400);
  });
});

describe('getDefaultAmount --/products', () => {
  it('returns status code 200', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
  });

  it('returns an array with length of 5, reflecting the default quantity of results the endpoint should return', async () => {
    const res = await request(app).get('/products');
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body).toHaveLength(5);
  });

  it('returns productid 1 through 5', async () => {
    const res = await request(app).get('/products');
    let productIDs = res.body.map(product => product.productid);
    expect(productIDs).toEqual([1,2,3,4,5]);
    client.end();
  });
});





