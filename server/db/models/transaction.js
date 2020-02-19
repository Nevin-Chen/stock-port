const Sequelize = require("sequelize");
const db = require("../db");

const Transaction = db.define("transaction", {
  tickerSymbol: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  }
});

module.exports = Transaction;
