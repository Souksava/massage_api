const { InsertRoomType, UpdateRoomType, DeleteRoomType, SelectRoomType, CountRoomType, AllRoomType } = require('../controllers/management/room_type_controller');
const { checkToken } = require('../controllers/auth/verify_token_validate');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('Room Type');
});
router.get("/view/:search/:shopID/:page", checkToken, SelectRoomType);
router.get("/count/:search/:shopID", checkToken, CountRoomType);
router.get("/all/:search/:shopID", checkToken, AllRoomType);
router.post("/create", checkToken, InsertRoomType);
router.put("/update", checkToken, UpdateRoomType);
router.delete("/delete/:id", checkToken, DeleteRoomType);
module.exports = router;
