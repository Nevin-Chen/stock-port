const router = require('express').Router();
const stocksAPI = require("../db/models/iexAPI")

module.exports = router;

router.get('/', async (req, res, next) => {
    try {
    } catch (error) {
        next(error)
    }
})