const { InsertPackage, UpdatePackage, DeletePackage, SelectPackage, CountPackage, AllPackage } = require('../controllers/management/package_controller');
const { checkToken } = require('../controllers/auth/verify_token_validate');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('package massage');
});
router.get("/view/:search/:shopID/:page", checkToken, SelectPackage);
router.get("/count/:search/:shopID", checkToken, CountPackage);
router.get("/all/:search/:shopID", checkToken, AllPackage);
router.post("/create", checkToken, InsertPackage);
router.put("/update", checkToken, UpdatePackage);
router.delete("/delete/:id", checkToken, DeletePackage);
module.exports = router;
