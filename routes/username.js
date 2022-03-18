const { InsertUsername, UpdateUsername, DeleteUsername, SelectUsername, CountUsername, AllUsername } = require('../controllers/management/username_controller');
const { checkToken } = require('../controllers/auth/verify_token_validate');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('Username');
});
router.get("/view/:search/:shopID/:page", checkToken, SelectUsername);
router.get("/count/:search/:shopID", checkToken, CountUsername);
router.get("/all/:search/:shopID", checkToken, AllUsername);
router.post("/create", checkToken, InsertUsername);
router.put("/update", checkToken, UpdateUsername);
router.delete("/delete/:id", checkToken, DeleteUsername);
module.exports = router;
