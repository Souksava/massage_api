const pool = require("../../connect");
module.exports = {
    InsertExchange: async (req, res) => {
        let { rate, rateBuy, rateSell, shopID } = req.body;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call exchange_insert(?,?,?,?)",
                [
                    rate,
                    rateBuy,
                    rateSell,
                    shopID
                ]
            );
            // ຮັບເງື່ອນໄຂຕ່າງໆທີ່ດາຕ້າສົ່ງມາໃຫ້
            if (resp[0][0].msg) {
                resp = {
                    status: 201,
                    msg: resp[0][0].msg
                }
            }
            // End
        } catch (error) {
            resp = error;
            conn.end();
        } finally {
            if (conn) conn.release();
            res.json(resp);
            console.log(resp);
        }
    },
    UpdateExchange: async (req, res) => {
        let { excID, rate, rateBuy, rateSell } = req.body;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call exchange_update(?,?,?,?)",
                [
                    excID,
                    rate,
                    rateBuy,
                    rateSell
                ]
            );
            // ຮັບເງື່ອນໄຂຕ່າງໆທີ່ດາຕ້າສົ່ງມາໃຫ້
            if (resp[0][0].msg) {
                resp = {
                    status: 201,
                    msg: resp[0][0].msg
                }
            }
            // End
        } catch (error) {
            resp = error;
            conn.end();
        } finally {
            if (conn) conn.release();
            res.json(resp);
            console.log(resp);
        }
    },
    DeleteExchange: async (req, res) => {
        let id = req.params.id;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call exchange_delete(?)",
                [
                    id
                ]
            );
            // ຮັບເງື່ອນໄຂຕ່າງໆທີ່ດາຕ້າສົ່ງມາໃຫ້
            if (resp[0][0].msg) {
                resp = {
                    status: 201,
                    msg: resp[0][0].msg
                }
            }
            // End
        } catch (error) {
            resp = error;
            conn.end();
        } finally {
            if (conn) conn.release();
            res.json(resp);
            console.log(resp);
        }
    },
    SelectExchange: async (req, res) => {
        let search = req.params.search;
        let shopID = req.params.shopID;
        let conn, resp;
        if (search == "null") {
            search = "";
        }
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call exchange_read(?,?)",
                [
                    "%" + search + "%",
                    shopID,
                ]
            );
        } catch (error) {
            conn.end();
            return res.status(500).json(error);
        } finally {
            if (conn) conn.release();
            console.log(resp[0]);
            res.json(resp[0]);
        }
    },
}