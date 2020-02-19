const router = require("express").Router();
const stocksAPI = require("../db/models/iexAPI");
const { Transaction, User } = require("../db/models");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const stocks = await Transaction.findAll({
      where: { userId: req.session.passport.user }
    });
    res.json(stocks);
  } catch (error) {
    next(err);
  }
});

router.post("/purchase", async (req, res, next) => {
  const { quantity, tickerSymbol } = req.body;
  try {
    if (!tickerSymbol || !quantity) {
      res.sendStatus(500);
      next();
    }
    const quote = await stocksAPI.purchaseStock(tickerSymbol);
    if (quote === undefined) {
      res.status(401).send("Invalid symbol");
    } else {
      const { latestPrice } = quote;
      const total = Number(quantity * latestPrice);
      const currentUser = await User.findOne({
        where: { id: req.session.passport.user }
      });
      if (total > currentUser.balance) {
        res.status(401).send("Purchase exceeds balance");
      } else {
        const addStockToPortolio = await Transaction.create({
          tickerSymbol: tickerSymbol,
          quantity: quantity,
          price: latestPrice,
          userId: req.session.passport.user
        });

        const newBalance = Number(currentUser.balance - total).toFixed(2);
        currentUser.balance = newBalance;
        await currentUser.save();
        res.json(quote);
      }
    }
  } catch (error) {
    next(error);
  }
});
