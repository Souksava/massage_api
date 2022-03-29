const { CheckExpire } = require('../controllers/management/shop_controller');
const { checkToken } = require('../controllers/auth/verify_token_validate');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('Shop');
});
router.get("/checkexpire/:shopID", checkToken, CheckExpire);

module.exports = router;
