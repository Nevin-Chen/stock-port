const axios = require ("axios");
require("dotenv").config();

class StocksAPI {
  async purchaseStock(sym) {
    try {
      const quoteData = await axios.get(
        `https://cloud.iexapis.com/stable/stock/${sym}/quote?token=${process.env.IEXCLOUD_PUBLIC_KEY}`
      );
      return quoteData;
    } catch (error) {
      console.error(error);
    }
  }
}

let stocks = new StocksAPI();

module.exports = stocks;
