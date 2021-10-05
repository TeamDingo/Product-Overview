const request = require("supertest");
const makeApp = require('../server/app.js');
const dat = require('../database/index.js');
const {jest: requiredJest} = require('@jest/globals');

const addToCart = jest.fn(dat.addToCart());

const app = makeApp({
  addToCart
})

// describe("GET /products", () => {
// // beforeAll(async () => {
// //   await db.getProductsList();
// // });

// // beforeEach(async () => {
// //   // seed with some data
// //   await db.query("INSERT INTO students (name) VALUES ('Elie'), ('Matt')");
// // });

// // afterEach(async () => {
// //   await db.query("DELETE FROM students");
// // });

// // afterAll(async () => {
// //   await db.query("DROP TABLE students");
// //   db.end();
// // });

//   test("Should expect 200 status code", async () => {
//     const response = await request(app).get("/products");
//     expect(response.statusCode).toBe(200);
//   });

//   test("It responds with an array of products", async () => {
//     const response = await request(app).get("/products");

//     expect(response.body[0]).toHaveProperty("id");
//     expect(response.body[0]).toHaveProperty("name");
//     expect(response.body[0]).toHaveProperty("slogan");
//     expect(response.body[0]).toHaveProperty("description");
//     expect(response.body[0]).toHaveProperty("category");
//     expect(response.body[0]).toHaveProperty("default_price");
//     expect(response.body[0]).toHaveProperty("created_at");
//     expect(response.body[0]).toHaveProperty("updated_at");
//   });
// });

// describe("GET /products/:id", () => {
//   test("Should respond with a 200 status code", async () => {
//     const response = await request(app).get("/products/:id");
//     expect(response.statusCode).toBe(200);
//   });

//   test("It responds with an array of one product", async () => {
//     const response = await request(app).get("/products/:id");
//     expect(response.body.length).toBe(1);

//     expect(response.body[0]).toHaveProperty("id");
//     expect(response.body[0]).toHaveProperty("name");
//     expect(response.body[0]).toHaveProperty("slogan");
//     expect(response.body[0]).toHaveProperty("description");
//     expect(response.body[0]).toHaveProperty("category");
//     expect(response.body[0]).toHaveProperty("default_price");
//     expect(response.body[0]).toHaveProperty("created_at");
//     expect(response.body[0]).toHaveProperty("updated_at");

//   });
// });

// describe("GET /products/:id/related", () => {
//   test("It responds with an array of related products", async () => {
//     const response = await request(app).get("/products/:id/related");
//     expect(response.body.length).toBe(1);

//     expect(response.body[0]).toHaveProperty("id");
//     expect(response.body[0]).toHaveProperty("current_product_id");
//     expect(response.body[0]).toHaveProperty("related_product_id");

//     expect(response.statusCode).toBe(200);
//   });
// });

// describe("GET /products/:id/styles", () => {
//   test("It responds with an array of products", async () => {
//     const response = await request(app).get("/products/:id/styles");
//     expect(response.body.length).toBe(1);

//     expect(response.body[0]).toHaveProperty("id");
//     expect(response.body[0]).toHaveProperty("productId");
//     expect(response.body[0]).toHaveProperty("sale_price");
//     expect(response.body[0]).toHaveProperty("original_price");
//     expect(response.body[0]).toHaveProperty("default_style");

//     expect(response.statusCode).toBe(200);
//   });
// });

// /* CART INTERACTION TESTS */

// describe("GET /cart", () => {
//   test("It responds with an array of cart items", async () => {
//     const response = await request(app).get("/cart");
//     expect(response.body.length).toBe(9);

//     expect(response.body[0]).toHaveProperty("id");
//     expect(response.body[0]).toHaveProperty("user_session");
//     expect(response.body[0]).toHaveProperty("product_id");
//     expect(response.body[0]).toHaveProperty("active");

//     expect(response.statusCode).toBe(200);
//   });
// });

describe("POST /cart", () => {
  test("It responds with the newly created cart item", async () => {
    debugger;
    const newCartItem = await request(app)
      .post("/cart")
      .send({
        userToken: 9,
        sku_id: 4,
        active: true,
      }
      );

  // make sure we add it correctly
  expect(addToCart.mock.calls[0][0]).toBe();
    // // expect(addToCart.mock.calls[0][1]).toBe(body.user_session);
    // // expect(addToCart.mock.calls[0][2]).toBe(body.product_id);
    // // expect(addToCart.mock.calls[0][3]).toBe(body.active);
    //   console.log(newCartItem);

    // // make sure we have 3 students now
    // const response = await request(app).get("/cart");
    // expect(response.body.length).toBe(1);
  });
});