const router = require('express').Router();
const stocksAPI = require("../db/models/iexAPI")

module.exports = router;

router.get('/', async (req, res, next) => {
    try {
    } catch (error) {
        next(error)
    }
})

router.post("/purchase", async (req, res, next) => {
    try {
      if (!req.body.tickerSymbol || !req.body.quantity) {
        res.sendStatus(500);
        next();
      } else {
        const quote = await stocksAPI.purchaseStock()
        res.json(quote);
      }
    } catch (error) {
      next(error);
    }
  });