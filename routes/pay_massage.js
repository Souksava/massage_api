const { SavePayMassage, billno} = require('../controllers/paymassage/pay_controller');
const { checkToken } = require('../controllers/auth/verify_token_validate');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('Pay massage');
});
router.get("/bill/:shopID", checkToken, billno);
router.post("/paymassage", checkToken, SavePayMassage);
module.exports = router;
