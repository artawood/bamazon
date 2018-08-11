//Bamazon Manager's Dashbord
const fs = require('fs');
const mysql = require('mysql');
const express = require('express');
const app = express();
const inquirer = require('inquirer');

//connects to mySQL database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bamazon_db"
  });

//CLI table display
const Table = require('cli-table');
let table = new Table({
    head: ['id','part number',
     'product', 'department', 'price', 'qty'],
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
});

inquirer.prompt([
    {
        type: "list",
        message: "Welcome to Bamazon Manager's Dashboard. Please select the following options:",
        choices: ["See Inventory Report", "See Sales Report", "See Customer Report", "Exit"],
        name: "selected"
    }
]).then(((userInput) => {
    if (userInput.selected === "See Inventory Report") {
        connection.connect(function(err) {
            if (err) throw err;
            connection.query("SELECT * FROM bamazon_db.products;", function (err, result) {
              if (err) throw err;
              result.forEach((item) => {
                  table.push(
                      [item.id, item.part_num, item.product, item.dept, item.price, item.qty]
                  );
              })
              console.log(table.toString());
              inquirer.prompt([
                  {
                      type: "confirm",
                      message: "Would you like to exit?",
                      name: "exit"
                  }
              ]).then((userInput) => {
                  if (userInput.exit) {
                      process.exit();
                  } 
              })
            });
        }); 
    } else if (userInput.selected === "See Sales Report") {
        //display sales table
    } else if (userInput.selected === "See Customer Report") {
        //display customer table
    } else if (userInput.selected === "Exit") {
        process.exit();
    }
}))

