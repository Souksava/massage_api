const pool = require("../../connect");
module.exports = {
    CheckExpire: async (req, res) => {
        let shopID = req.params.shopID;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call check_shop_expire(?)",
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
}