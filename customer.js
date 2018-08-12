// Various Node Dependencies
//===============================================================
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const app = express(); // not yet used
const inquirer = require('inquirer');

// Dependency for CLI Table
//===============================================================
const Table = require('cli-table');
const table = new Table({
    head: ['id','product', 'price', 'qty'],
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});

//establish connection to mySQL database
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bamazon_db"
});

//Start of the program
inquirer.prompt([
    {
        type: 'list',
        message: 'Welcome to Bamazon. What would you like to do?',
        choices: ["See available products", "Purchase a product", "Exit"],
        name: "customerChoice"
    }
]).then((userInput) => {
    if (userInput.customerChoice === "See available products") {
        connection.connect(function(err) {
            if (err) throw err;
            connection.query("SELECT id, product, price, qty FROM bamazon_db.products;", function (err, result) {
              if (err) throw err;
              result.forEach((col) => {
                  table.push(
                      [col.id, col.product, col.price, col.qty]
                  );
              })
              console.log(table.toString());
              inquirer.prompt([
                  {
                      type: "list",
                      message: "What would you like to do next?",
                      choices: ["Make a purchase", "Exit"],
                      name: "customerChoice"
                  }
              ]).then((userInput) => {
                  if (userInput.customerChoice === "Make a purchase") {
                      inquirer.prompt([
                          {
                              type: "input",
                              message: "Enter the product id number would you like to buy?",
                              name: "purchase"
                          },
                          {
                              type: "input",
                              message: "How many?",
                              name: "purchaseQty"
                          }
                      ]).then((userInput) => {
                        connection.query("SELECT id, qty FROM bamazon_db.products WHERE id = '" + userInput.purchase + "'", function (err, result) {
                            let available = "";
                            result.forEach((col)=> {
                                available = col.qty;
                            });
                            if (parseInt(available) - parseInt(userInput.purchaseQty) <= 0) {
                                console.log("This product only has " + available + " items available. Please come back again.");
                                process.exit();
                            } else {
                                connection.query("UPDATE bamazon_db.products SET qty = qty - " + parseInt(userInput.purchaseQty) + " WHERE id = '" + userInput.purchase + "'")
                                inquirer.prompt([
                                    {
                                        type: "confirm",
                                        message: "Would you like to purchase more products?",
                                        name: "moreProduct"
                                    }
                                ]).then((userInput) => {
                                    if (!userInput.moreProduct) {
                                        process.exit();
                                    }
                                })
                            }
                        })
                          
                      })
                  } else if (useInput.customerChoice === "Purchase a product") {
                      // inquirer with input of product
                        //use "SELECT SUBSTRING()" to allow user to query a substring of the product
                        // inquirer asking user to the next step (to make a purchase or exit the program)

                  } else if (userInput.customerChoice === "Exit") {
                      process.exit();
                  }
              })
            });
        });
    }
});

// app.get('/', function(req, res){
//     // about mysql
//     connection.query("SELECT * FROM bamazon_db", function (err, rows, fields){
//         if (err) throw err;
//         console.log("Successful query!");
//     })
// })

// app.listen(3306);