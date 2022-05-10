const pool = require("../../connect");
module.exports = {
    ReportPerzenEmp: async (req, res) => {
        let date1 = req.params.date1;
        let date2 = req.params.date2;
        let emp = req.params.emp;
        let shopID = req.params.shopID;
        let page = req.params.page;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call report_perzen_massage_limit(?,?,?,?,?)",
                [
                    date1,
                    date2,
                    emp,
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
    ReportPerzenEmpAll: async (req, res) => {
        let date1 = req.params.date1;
        let date2 = req.params.date2;
        let emp = req.params.emp;
        let shopID = req.params.shopID;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call report_perzen_massage(?,?,?,?)",
                [
                    date1,
                    date2,
                    emp,
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

    ReportPerzenEmpTotal: async (req, res) => {
        let date1 = req.params.date1;
        let date2 = req.params.date2;
        let emp = req.params.emp;
        let shopID = req.params.shopID;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call report_perzen_massage_total(?,?,?,?)",
                [
                    date1,
                    date2,
                    emp,
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
}