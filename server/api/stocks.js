const router = require("express").Router();
const { CalculateStock, Sleep } = require("../util");
const stocks = require("../db/models/iexAPI");
const { Transaction, User } = require("../db/models");

module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const portfolioView = await CalculateStock(req.session.passport.user);
    console.log(portfolioView);
    res.json(portfolioView);
  } catch (error) {
    next(error);
  }
});

router.post("/purchase", async (req, res, next) => {
  const { quantity, tickerSymbol } = req.body;
  try {
    if (!tickerSymbol || !quantity) {
      res.sendStatus(500);
      next();
    }
    if (quantity <= 0) {
      res.status(401).send("Invalid input");
    } else {
      const quote = await stocks.purchaseStock(tickerSymbol);
      const { data } = quote;
      if (data === undefined) {
        res.status(401).send("Invalid symbol");
      } else {
        let { latestPrice } = data;
        latestPrice = latestPrice.toFixed(2);
        const total = Number(quantity * latestPrice);
        const currentUser = await User.findOne({
          where: { id: req.session.passport.user }
        });
        if (total > currentUser.balance) {
          res.status(401).send("Purchase exceeds balance");
        } else {
          const addStockToPortolio = await Transaction.create({
            tickerSymbol: tickerSymbol.toUpperCase(),
            quantity: quantity,
            price: latestPrice,
            userId: req.session.passport.user
          });

          const newBalance = Number(currentUser.balance - total);
          currentUser.balance = newBalance;
          await currentUser.save();

          await Sleep(500);

          res.json(addStockToPortolio);
        }
      }
    }
  } catch (error) {
    next(error);
  }
});
