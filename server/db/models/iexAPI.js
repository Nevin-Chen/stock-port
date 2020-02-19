const iex = require("iexcloud_api_wrapper");
require("dotenv").config();

class StocksAPI {
  async purchaseStock(sym) {
    try {
      console.log(sym)
      const quoteData = await iex.quote(sym);
      return quoteData;
    } catch (error) {
      console.error(error);
    }
  }
}

let stocks = new StocksAPI();

module.exports = stocks;
