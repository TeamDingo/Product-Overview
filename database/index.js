const { Pool } = require('pg');
// require('dotenv').config();

const { db } = require('../config.js');

const pool = new Pool({
  user: db.user,
  host: db.host,
  database: db.database,
  password: db.password,
  port: db.port
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

  const query = `SELECT products.id, products.name, products.slogan, products.description, products.category, products.default_price, jsonb_agg(jsonb_build_object('feature', features.feature, 'value', features.value)) as features FROM products LEFT OUTER JOIN features ON products.id = features.product_id WHERE products.id = ${id} group by 1`

  pool
  .query(query)
  .then((res) => callback(null, res))
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
  // const query = `SELECT styles.productId,
  //   jsonb_agg('hello',
  //     jsonb_build_object(
  //       'style_id',styles.id,
  //       'name', styles.name,
  //       'sale_price', styles.sale_price,
  //       'original_price', styles.original_price,
  //       'default?', styles.default_style,
  //     jsonb_agg(jsonb_build_object(
  //       'thumbnail_url', photos.thumbnail_url ,
  //        'url', photos.url)),
  //     jsonb_agg(jsonb_build_object(
  //       skus.id, json_build_object(
  //         'quantity', skus.quantity,
  //         'size', skus.size)))
  //         ))
  // FROM ((styles LEFT OUTER JOIN photos ON styles.id = photos.styleId) INNER JOIN skus ON styles.id=skus.styleId) WHERE styles.productId = ${id} group by styles.productId`;

  // jsonb_agg(jsonb_build_object(jsonb_agg(jsonb_build_object('size', skus.size, 'quantity', skus.quantity)) as skus.id)) as skus

  // const query = `SELECT styles.productId, styles.id, styles.name, styles.sale_price, styles.original_price, styles.default_style, jsonb_agg(jsonb_build_object('thumbnail_url', photos.thumbnail_url , 'url', photos.url)) as photos, jsonb_agg(jsonb_build_object(skus.id, json_build_object('quantity', skus.quantity, 'size', skus.size))) as skus
  // FROM ((styles LEFT OUTER JOIN photos ON styles.id = photos.styleId) INNER JOIN skus ON styles.id=skus.styleId) WHERE styles.productId = ${id} group by styles.productId, styles.id`;

  const query =

  `SELECT styles.productId,
	(
		SELECT jsonb_agg(styles)
            	FROM (
              		SELECT
               			styles.id,
               			styles.name,
               			styles.sale_price,
               			styles.original_price,
               			styles.default_style,
               			(
                 		SELECT jsonb_agg(photos)
                 		FROM (
                   			SELECT
                   				photos.thumbnail_url,
                   				photos.url
                   			FROM photos
                   			WHERE photos.styleId = styles.id
                        GROUP BY photos.id
                 			) AS photos
               			) AS photos,
               			(
                 		SELECT jsonb_agg(skus)
                 		FROM (
                   			SELECT
                   				skus.size,
                   				skus.quantity
                   			FROM skus
                   			WHERE skus.styleId = styles.id
                        GROUP BY skus.size, skus.quantity

                 			) AS skus
               			) AS skus
              		FROM styles WHERE styles.productId = ${id}
                  GROUP BY styles.id
            		) AS styles
          	) AS results
            FROM styles WHERE styles.productId = ${id} LIMIT 1`

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

const updateAtTime = function(id, callback) {
  // const query =  `UPDATE INTO products (updated_at) VALUES (NOW()) WHERE products.id= ${id}`;
}

//pool.end();

module.exports = {
  getProductsList,
  getProdInfo,
  getRelatedProducts,
  getStyles,
  getCart,
  addToCart,
  updateAtTime
};

