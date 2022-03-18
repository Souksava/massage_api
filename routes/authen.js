var express = require('express');
var router = express.Router();
const { Signin, CheckData } = require('../controllers/auth/signin_controller');
const { checkToken } = require('../controllers/auth/verify_token_validate');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('authen');
});
router.post("/signin", Signin);
router.post("/Checkvalid", checkToken, CheckData);
module.exports = router;
