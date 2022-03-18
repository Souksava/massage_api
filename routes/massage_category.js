const { InsertCategory, UpdateCategory, DeleteCategory, SelectCategory, CountCategory } = require('../controllers/management/massage_category_controller');
const { checkToken } = require('../controllers/auth/verify_token_validate');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('massage Category');
});
router.get("/view/:search/:shopID/:page", checkToken, SelectCategory);
router.get("/count/:search/:shopID", checkToken, CountCategory);
router.post("/create", checkToken, InsertCategory);
router.put("/update", checkToken, UpdateCategory);
router.delete("/delete/:id", checkToken, DeleteCategory);
module.exports = router;
