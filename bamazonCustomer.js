var mysqul = require("mysql");
var inquirer = require("inquirer");
require("console.table");

//Create the connection info for the sql database
var connection = mysqul.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
});

//Connect to the mysql server and database
connection.connect(function (err) {
  if (err) throw err;
  //start function is called after connection is established to prompt user
  start();
});

function start() {
  inquirer
    .prompt({
      name: "buyOrLeave",
      type: "list",
      message: "Welcome to Bamazon! How can I help you?",
      choices: ["BUY AN ITEM", "LEAVE THE STORE"]
    })
    .then(function (answer) {
      // based on their answer, either call the buy or leave functions
      if (answer.buyOrLeave.toUpperCase() === "BUY AN ITEM") {
        console.log("Great! Let me show you what we have...");
        buyItem();
      }
      else {
        // leaveStore();
        console.log("Thank you for stopping by!")
        // connection.end();
      }
    });
}

function buyItem() {
  // query the database for all items available
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    // console.table(results);
    // once you have the items, prompt the user for which they'd like to buy
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function () {
            console.table(results);
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name + " | " + results[i].department_name + " | " + results[i].price + " | " + results[i].stock_quantity);
            }
            return choiceArray;
          },
          message: "What item would you like to buy?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to buy?"
        }
      ])
      .then(function (answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }
          console.log(chosenItem);
        // determine if quantity is available
        if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: answer.quantity
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("Item bought successfully!");
              start();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Your quantity is not available. Try again...");
          // choices();
          start();
        }
      });
  });
}


//_______________________//
//Remaining code:
  //Correct issue where selecting a quatity to buy gives an error
  //Once the customer has placed the order, check if there is enough of the product to meet the customer's request.
    //If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
    //However, if the store does have enough of the product, should fulfill the customer's order.
  //Update the SQL database to reflect the remaining quantity.
  //Once the update goes through, show the customer the total cost of their purchase.