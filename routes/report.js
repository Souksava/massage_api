const { ReportPayMassage, ReportPayMassageAll, ReportPayMassageTotal, ReportPayMassPrint } = require('../controllers/Report/report_pay_massage_controller');
const { ReportPayMassageDetail, ReportPayMassageDetailAll, ReportPayMassageDetailTotal } = require('../controllers/Report/report_pay_massagedetail_controller');
const { ReportMonthly, ReportYearly } = require('../controllers/Report/report_graph_controller');
const { ReportPerzenEmp, ReportPerzenEmpAll, ReportPerzenEmpTotal } = require('../controllers/Report/report_perzen_emp_controller');
const { checkToken } = require('../controllers/auth/verify_token_validate');
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.json('Report');
});
// Pay Massage
router.get("/paymassage/:date1/:date2/:paySTT/:shopID/:page", checkToken, ReportPayMassage);
router.get("/paymassageall/:date1/:date2/:paySTT/:shopID", checkToken, ReportPayMassageAll);
router.get("/paymassagetotal/:date1/:date2/:paySTT/:shopID", checkToken, ReportPayMassageTotal);
router.get("/paymassageprint/:payID/:shopID", checkToken, ReportPayMassPrint);
// End Pay Massage
// Pay Massage Detail
router.get("/paymassagedetail/:date1/:date2/:paySTT/:shopID/:page", checkToken, ReportPayMassageDetail);
router.get("/paymassagedetailall/:date1/:date2/:paySTT/:shopID", checkToken, ReportPayMassageDetailAll);
router.get("/paymassagedetailtotal/:date1/:date2/:paySTT/:shopID", checkToken, ReportPayMassageDetailTotal);
// End Pay Massage Detail
router.get("/reportmonthly/:shopID", checkToken, ReportMonthly);
router.get("/reportyearly/:shopID", checkToken, ReportYearly);
// 
// Perzen
router.get("/perzen/:date1/:date2/:emp/:shopID/:page", checkToken, ReportPerzenEmp);
router.get("/perzenall/:date1/:date2/:emp/:shopID", checkToken, ReportPerzenEmpAll);
router.get("/perzentotal/:date1/:date2/:emp/:shopID", checkToken, ReportPerzenEmpTotal);
// End

module.exports = router;
