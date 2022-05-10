const { InsertPerzen, UpdatePerzen, DeletePerzen, SelectPerzen, CountPerzen, AllPerzen } = require('../controllers/management/perzen_emp_controller');
const { checkToken } = require('../controllers/auth/verify_token_validate');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('Room');
});
router.get("/view/:search/:shopID/:page", checkToken, SelectPerzen);
router.get("/count/:search/:shopID", checkToken, CountPerzen);
router.get("/all/:search/:shopID", checkToken, AllPerzen);
router.post("/create", checkToken, InsertPerzen);
router.put("/update", checkToken, UpdatePerzen);
router.delete("/delete/:perzeID/:shopID", checkToken, DeletePerzen);
module.exports = router;
