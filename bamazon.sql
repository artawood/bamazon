DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  part_num VARCHAR(10) NULL,
  product VARCHAR(45) NULL,
  dept VARCHAR(55) NULL,
  price DECIMAL(10,2) NULL,
  qty INT NULL,
  PRIMARY KEY (id)
);



