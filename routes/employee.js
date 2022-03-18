const { InsertEmployee, UpdateEmployee, DeleteEmployee, SelectEmployee, CountEmployee, AllEmployee } = require('../controllers/management/employee_controller');
const { checkToken } = require('../controllers/auth/verify_token_validate');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('employee');
});
router.get("/view/:search/:shopID/:page", checkToken, SelectEmployee);
router.get("/count/:search/:shopID", checkToken, CountEmployee);
router.get("/all/:search/:shopID", checkToken, AllEmployee);
router.post("/create", checkToken, InsertEmployee);
router.put("/update", checkToken, UpdateEmployee);
router.delete("/delete/:id", checkToken, DeleteEmployee);
module.exports = router;
