const { Pool } = require('pg');


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sdcoverview',
  password: null,
  port: 5432
})

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  })
})

const getProductsList = function(callback) {
  const query = "SELECT * FROM products LIMIT 5";
  pool
  .query(query)
  .then(res => callback(null, res.rows))
  .catch(err => callback (err, null))
}

const getProdInfo = function(id, callback) {
  const query = `SELECT * FROM products WHERE id = ${id} LIMIT 1`;
  pool
  .query(query)
  .then((res) => callback(null, res.rows))
  .catch((err) => callback (err, null))
}

const getRelatedProducts = function(id, callback) {
  console.log(id);
  const query = `SELECT ARRAY_AGG(related_product_id) FROM related WHERE current_product_id = ${id}`;
  pool
  .query(query)
  .then(res => callback(null, res.rows[0].array_agg))
  .catch(err => callback (err, null))
}

const getStyles = function(id, callback) {
  const query = `SELECT * FROM styles WHERE productId = ${id}`;
  pool
  .query(query)
  .then(res => callback(null, res.rows))
  .catch(err => callback (err, null))
}

const getCart = function(userToken, callback) {
  const query = `SELECT ARRAY_AGG(product_id) FROM cart WHERE user_session = ${userToken}`;
  pool
  .query(query)
  .then(res => callback(null, res.rows[0].array_agg))
  .catch(err => callback (err, null))
}

const addToCart = function(params, callback) {
  const query = `INSERT INTO cart (user_session, product_id, active) VALUES (${params.userToken}, ${params.sku_id}, ${params.active})`;
  pool
  .query(query) //, [params.userToken, params.sku_id, true])
  .then(res => callback(null, res))
  .catch(err => callback (err, null))
}

const updateAtTime = function() {

}

//pool.end();

module.exports = {
  pool,
  getProductsList,
  getProdInfo,
  getRelatedProducts,
  getStyles,
  getCart,
  addToCart,
  updateAtTime
};

