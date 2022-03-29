const pool = require("../../connect");
module.exports = {
    ReportMonthly: async (req, res) => {
        let shopID = req.params.shopID;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call report_dashboard_monthly(?)",
                [
                    shopID,
                ]
            );

        } catch (error) {
            resp = error;
            conn.end();
        } finally {
            if (conn) conn.release();
            res.json(resp[0]);
        }
    },
    ReportYearly: async (req, res) => {
        let shopID = req.params.shopID;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call report_dashboard_yearly(?)",
                [
                    shopID,
                ]
            );

        } catch (error) {
            resp = error;
            conn.end();
        } finally {
            if (conn) conn.release();
            res.json(resp[0]);
        }
    }
}