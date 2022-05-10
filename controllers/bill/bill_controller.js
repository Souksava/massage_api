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
}