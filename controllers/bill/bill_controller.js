const pool = require("../../connect");
module.exports = {
    UpdateBill: async (req, res) => {
        let { bookID, pay_statusID, payDate, remarks, payID, shopID } = req.body;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call bill_update(?,?,?,?,?,?)",
                [
                    bookID, pay_statusID, payDate, remarks, payID, shopID
                ]
            );
            // ຮັບເງື່ອນໄຂຕ່າງໆທີ່ດາຕ້າສົ່ງມາໃຫ້
            if (resp[0][0].msg) {
                resp = {
                    status: 201,
                    msg: resp[0][0].msg,
                    title: resp[0][0].title,
                    message: resp[0][0].message
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
    UpdateBilldetail: async (req, res) => {
        let { packID, roomID, empID, qtys, prices, startTime, endTime, remarks, IDs, shopID } = req.body;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call billdetail_update(?,?,?,?,?,?,?,?,?,?)",
                [
                    packID, roomID, empID, qtys, prices, startTime, endTime, remarks, IDs, shopID
                ]
            );
            // ຮັບເງື່ອນໄຂຕ່າງໆທີ່ດາຕ້າສົ່ງມາໃຫ້
            if (resp[0][0].msg) {
                resp = {
                    status: 201,
                    msg: resp[0][0].msg,
                    title: resp[0][0].title,
                    message: resp[0][0].message
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
    getStatus: async (req, res) => {
        let conn, resp;

        try {
            conn = await pool.getConnection();
            resp = await conn.query("call get_Status()");
        } catch (error) {
            conn.end();
            return res.status(500).json(error);
        } finally {
            if (conn) conn.release();
            res.json(resp[0]);
        }
    },
}