const pool = require("../../connect");
module.exports = {
    ReportPayMassage: async (req, res) => {
        let date1 = req.params.date1;
        let date2 = req.params.date2;
        let paySTT = req.params.paySTT;
        let shopID = req.params.shopID;
        let page = req.params.page;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call report_pay_massage_limit(?,?,?,?,?)",
                [
                    date1,
                    date2,
                    paySTT,
                    shopID,
                    page
                ]
            );

        } catch (error) {
            resp = error;
            conn.end();
        } finally {
            if (conn) conn.release();
            res.json(resp[0]);
            console.log(resp[0]);
        }
    },
    ReportPayMassageAll: async (req, res) => {
        let date1 = req.params.date1;
        let date2 = req.params.date2;
        let paySTT = req.params.paySTT;
        let shopID = req.params.shopID;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call report_pay_massage(?,?,?,?)",
                [
                    date1,
                    date2,
                    paySTT,
                    shopID,
                ]
            );

        } catch (error) {
            resp = error;
            conn.end();
        } finally {
            if (conn) conn.release();
            res.json(resp[0]);
            console.log(resp[0]);
        }
    },

    ReportPayMassageTotal: async (req, res) => {
        let date1 = req.params.date1;
        let date2 = req.params.date2;
        let paySTT = req.params.paySTT;
        let shopID = req.params.shopID;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call report_pay_massage_total(?,?,?,?)",
                [
                    date1,
                    date2,
                    paySTT,
                    shopID,
                ]
            );

        } catch (error) {
            resp = error;
            conn.end();
        } finally {
            if (conn) conn.release();
            res.json(resp[0]);
            console.log(resp[0]);
        }
    },
    ReportPayMassPrint: async (req, res) => {
        let payID = req.params.payID;
        let shopID = req.params.shopID;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call report_pay_massagedetail_print(?,?)",
                [
                    payID,
                    shopID
                ]
            );

        } catch (error) {
            resp = error;
            conn.end();
        } finally {
            if (conn) conn.release();
            res.json(resp[0]);
            console.log(resp[0]);
        }
    }
}