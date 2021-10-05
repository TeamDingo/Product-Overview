CREATE DATABASE sdcoverview;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  slogan VARCHAR(1000),
  description VARCHAR(1000),
  category VARCHAR(1000),
  default_price VARCHAR(25) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
)

CREATE TABLE styles (
id SERIAL PRIMARY KEY,
productId INT NOT NULL,
name VARCHAR(50),
sale_price VARCHAR(25),
original_price VARCHAR(25) NOT NULL,
default_style boolean NOT NULL,
FOREIGN KEY(productId)
  REFERENCES products(id)
  ON DELETE CASCADE
)

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  feature VARCHAR(255),
  value VARCHAR(255),
  FOREIGN KEY(product_id)
    REFERENCES products(id)
      ON DELETE CASCADE
)

CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  FOREIGN KEY(current_product_id)
  REFERENCES products(id)
  ON DELETE CASCADE
)


CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  styleId INT NOT NULL,
  thumbnail_url VARCHAR(50000),
  url VARCHAR(50000),
  FOREIGN KEY(styleId)
    REFERENCES styles(id)
    ON DELETE CASCADE
)

CREATE TABLE cart (
  id SERIAL PRIMARY KEY,
  user_session INT NOT NULL,
  product_id INT NOT NULL,
  active BOOLEAN NOT NULL,
)

CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  styleId INT NOT NULL,
  size VARCHAR(10) NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY(styleId)
    REFERENCES styles(id)
    ON DELETE CASCADE
)



