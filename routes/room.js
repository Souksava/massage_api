const { InsertRoom, UpdateRoom, DeleteRoom, SelectRoom, CountRoom, AllRoom } = require('../controllers/management/room_controller');
const { checkToken } = require('../controllers/auth/verify_token_validate');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('Room');
});
router.get("/view/:search/:shopID/:page", checkToken, SelectRoom);
router.get("/count/:search/:shopID", checkToken, CountRoom);
router.get("/all/:search/:shopID", checkToken, AllRoom);
router.post("/create", checkToken, InsertRoom);
router.put("/update", checkToken, UpdateRoom);
router.delete("/delete/:id", checkToken, DeleteRoom);
module.exports = router;
