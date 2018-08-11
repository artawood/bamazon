//variables for requiring from other node packages
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const app = express();
const inquirer = require('inquirer');
const Table = require('cli-table');
const table = new Table({
    head: ['product', 'price', 'qty'],
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});

//establish connection to mySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bamazon_db"
});

let productList = [];

connection.query("SELECT product FROM bamazon_db.products;",
function (err, result) {
    if (err) throw err;
    result.forEach(product => {
        let item = product.product;
        productList += item;
    })
})

console.log(productList);

// //Start of the program
// inquirer.prompt([
//     { //prompt user to select options
//         type: 'list',
//         message: 'Welcome to Bamazon. What would you like to do?',
//         choices: ["See available products", "Make a purchase", "Exit"],
//         name: "customerChoice"
//     }
// ]).then((userInput) => {
//     //return functions depending on user's input
//     if (userInput.customerChoice === "See available products") {
//         connection.connect(function(err) {
//             if (err) throw err;
//             connection.query("SELECT product, price, qty FROM bamazon_db.products;", function (err, result) {
//               if (err) throw err;
//               result.forEach((item) => {
//                   table.push(
//                       [item.product, item.price, item.qty]
//                   );
//               })
//               console.log(table.toString());
//               inquirer.prompt([
//                   {
//                       type: "list",
//                       message: "What would you like to do next?",
//                       choices: ["Make a purchase", "Exit"],
//                       name: "customerChoice"
//                   }
//               ]).then((userInput) => {
//                   if (userInput.customerChoice === "Make a purchase") {
//                       inquirer.prompt([
//                           {
//                               type: "input",
//                               message: "What would you like to buy?",
//                               name: "purchase"
//                           },
//                           {
//                               type: "input",
//                               message: "How many?",
//                               name: "purchaseQty"
//                           }
//                       ]).then((userInput) => {
//                           connection.query("UPDATE bamazon_db.products SET qty = qty - " + parseInt(userInput.purchaseQty) + " WHERE product = '" + userInput.purchase + "'")
//                           inquirer.prompt([
//                               {
//                                   type: "confirm",
//                                   message: "Would you like to purchase more products?",
//                                   name: "moreProduct"
//                               }
//                           ]).then((userInput) => {
//                               if (!userInput.moreProduct) {
//                                   process.exit();
//                               }
//                           })
//                       })
//                   } else if (userInput.customerChoice === "Exit") {
//                       process.exit();
//                   }
//               })
//             });
//         });
//     }
// });
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   connection.query("SELECT * FROM bamazon_db.products;", function (err, result) {
//     if (err) throw err;
//     result.forEach((item) => {
//         table.push(
//             [item.id, item.part_num, item.product, item.dept, item.price, item.qty]
//         );
//     })
//     console.log(table.toString());
//   });
// });

// app.get('/', function(req, res){
//     // about mysql
//     connection.query("SELECT * FROM bamazon_db", function (err, rows, fields){
//         if (err) throw err;
//         console.log("Successful query!");
//     })
// })

// app.listen(3306);