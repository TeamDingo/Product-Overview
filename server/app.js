const db = require('../database/index.js');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/:id/related/', (req, res) => {
  const { id } = req.params;
  db.getRelatedProducts(id, (err, response) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log(response);
      res.status(200).send(response);
    }
  });
});

app.get('/:id/styles', (req, res) => {
  const { id } = req.params;
  db.getStyles(id, (err, response) => {
    if (err) {
      console.log('could not fetch styles!', err);
      res.status(404).send(err);
    } else {
      console.log(response[0]);
      res.send(response);
    }
  });
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  if (req.params.id !== null)
  {db.getProdInfo(id, (err, response) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log(response.rows);
      res.send(response.rows);
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

app.get('/cart/:userToken', (req, res) => {
  const { userToken } = req.params;
  db.getCart(userToken, (err, response) => {
    if (err) {
      console.log('could not get cart', userToken);
      res.status(404).send(err);
    } else {
      res.send(response);
    }
  });
});

app.post('/cart', (req, res) => {
  const params = {
    userToken:  req.params.userToken,
    sku_id: req.params.sku_id,
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

module.exports = app;