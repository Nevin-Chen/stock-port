const router = require("express").Router();
const stocksAPI = require("../db/models/iexAPI");
const { Transaction, User } = require("../db/models");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

router.post("/purchase", async (req, res, next) => {
  console.log(req.body);
  const { quantity, tickerSymbol } = req.body;
  try {
    if (!tickerSymbol || !quantity) {
      res.sendStatus(500);
      next();
    } else {
      const quote = await stocksAPI.purchaseStock();
      const { symbol, latestPrice } = quote;
      const total = Number(quantity * latestPrice);

      const addStockToPortolio = await Transaction.create({
        tickerSymbol: tickerSymbol,
        quantity: quantity,
        total: total.toFixed(2),
        userId: req.session.passport.user
      });

      const currentUser = await User.findOne({
        where: { id: req.session.passport.user }
      });
      if (total > currentUser.balance) {
        res.status(401).send("Purchase exceeds balance");
      } else {
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
