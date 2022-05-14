const { UpdateBill, UpdateBilldetail, getStatus } = require('../controllers/bill/bill_controller');
const { checkToken } = require('../controllers/auth/verify_token_validate');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('Pay massage');
});
router.put("/updatebill", checkToken, UpdateBill);
router.put("/updatebilldetail", checkToken, UpdateBilldetail);
router.get("/status", checkToken, getStatus);
module.exports = router;
