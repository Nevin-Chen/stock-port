const router = require('express').Router();
const stocksAPI = require("../db/models/iexAPI")

module.exports = router;

router.get('/', async (req, res, next) => {
    try {
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try {
      if (!req.body.ticker || !req.body.quantity) {
        res.sendStatus(500);
        next();
      } else {
        const transaction = await user.create(req.body);
        res.json(newCampus);
      }
    } catch (error) {
      next(error);
    }
  });