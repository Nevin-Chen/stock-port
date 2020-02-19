const router = require("express").Router();
const { Transaction } = require("../db/models");

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
