const { InsertExchange, UpdateExchange, DeleteExchange, SelectExchange, } = require('../controllers/management/exchange_controller');
const { checkToken } = require('../controllers/auth/verify_token_validate');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('Room Type');
});
router.get("/view/:search/:shopID", checkToken, SelectExchange);
router.post("/create", checkToken, InsertExchange);
router.put("/update", checkToken, UpdateExchange);
router.delete("/delete/:id", checkToken, DeleteExchange);
module.exports = router;
