const fetch = require("node-fetch");
require("dotenv").config();

class StocksAPI {
    async purchaseStock(symbol) {
        try {
            const stockQuote = await fetch(`https://cloud.iexapis.com/stable/stock/XOM/quote?token=${process.env.IEX_API_KEY}`)
        } catch (error) {
            console.error(error)
        }
    }
}
  
let stocks = new StocksAPI();
  
module.exports = stocks;
  