const express = require('express');
const cors = require('cors');

function makeApp (db) {

  const app = express();

  app.use(express.static('dist'));
  app.use(express.json());
  app.use(cors());

  // const getProductList = () => {
  //   return axios.get(`${url}/products`);
  // };

  app.get('/products', (req, res) => {
    const params = {
      id: req.query.id || null
    };

    if (params.id !== null) {
      console.log('just one')
      db.getProdInfo(params.id, (err, response) => {
        if (err) {
          console.log('here')
          res.status(404).send(err);
        } else {
          res.send(response);
        }
      });
    } else {
    db.getProductsList((err, response) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.send(response);
      }
    });
  }
  });

  /* **** RELATED ITEMS  *** */

  // const getRelatedProducts = (id = 1) => {
  //   return axios.get(`${url}/products/${id}/related`);
  // };

  app.get('/related', (req, res) => {
    const { id } = req.query;
    db.getRelatedProducts(id, (err, response) => {
      if (err) {
        res.status(404).send(err);
      } else {
        console.log(response);
        res.status(200).send(response);
      }
    });
  });

  // const getProductStyles = (id = 1) => {
  //   return axios.get(`${url}/products/${id}/styles`);
  // };

  app.get('/styles', (req, res) => {
    const { id } = req.query;
    db.getStyles(id, (err, response) => {
      if (err) {
        console.log('could not fetch styles!', id);
        res.status(404).send(err);
      } else {
        res.send(response);
      }
    });
  });

  // const getCart = (userToken) => {
  //   return axios.get(`${url}/cart/${userToken}`);
  // };

  app.get('/cart', (req, res) => {
    const { userToken } = req.query;
    db.getCart(userToken, (err, response) => {
      if (err) {
        console.log('could not get cart', userToken);
        res.status(404).send(err);
      } else {
        res.send(response);
      }
    });
  });

  // const addToCart = (user_token, sku_id) => {
  //   console.log(user_token);
  //   console.log(sku_id);
  //   return axios.post(`${url}/cart/`, {
  //     user_token: user_token,
  //     sku_id: sku_id,
  //   });
  // };

  app.post('/cart', (req, res) => {
    const params = {
      userToken:  req.query.userToken,
      sku_id: req.query.sku_id,
      active: true
    }
    db.addToCart(params, (err, response) => {
      if (err) {
        console.log('could not add to cart');
        res.status(404).send(err);
      } else {
        res.send(sku_id, ' added to cart');
      }
    });
  });
  return app;
}

module.exports = makeApp;