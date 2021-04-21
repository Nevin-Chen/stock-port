const { Transaction } = require("../db/models/");
const stocks = require("../db/models/iexAPI");

const CalculateStock = async userId => {
  let portfolio = [];
  let counter = {};
  const stocks = await Transaction.findAll({
    where: { userId: userId }
  });
  for (let i = 0; i < stocks.length; i++) {
    const { tickerSymbol, quantity, id, price } = stocks[i];
    if (!counter[tickerSymbol])
      counter[tickerSymbol] = {
        id: id,
        quantity: 0,
        currentPrice: 0,
        openPrice: price
      };
    counter[tickerSymbol].quantity += quantity;
  }
  await ComparePrice(counter);

  for (tickerSymbol in counter) {
    portfolio.push({
      id: counter[tickerSymbol].id,
      tickerSymbol: tickerSymbol,
      quantity: counter[tickerSymbol].quantity,
      openPrice: counter[tickerSymbol].openPrice,
      price: counter[tickerSymbol].currentPrice
    });
  }
  return portfolio;
};

const ComparePrice = async counter => {
  for (tickerSymbol in counter) {
    const { data } = await stocks.purchaseStock(tickerSymbol);
    const { latestPrice } = data;
    counter[tickerSymbol].currentPrice = latestPrice;
    counter[tickerSymbol].total = Number(
      (counter[tickerSymbol].quantity * latestPrice).toFixed(2)
    );
  }
  return counter;
};

function Sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  CalculateStock,
  Sleep
};
