const pool = require("../../connect");
module.exports = {
    SavePayMassage: async (req, res) => {
        let { billno, userID, cusID, payDate, bookID, remark, payStatus, shopID, GetMoney, items } = req.body;
        let conn, resp;
        try {
            console.log(JSON.stringify(items));
            conn = await pool.getConnection();
            resp = await conn.query("call pay_massage_insert(?,?,?,?,?,?,?,?,?,?)",
                [
                    billno, userID, cusID, payDate, bookID, remark, payStatus, shopID, GetMoney, JSON.stringify(items)
                ]
            );
            // ຮັບເງື່ອນໄຂຕ່າງໆທີ່ດາຕ້າສົ່ງມາໃຫ້
            if (resp[0][0].msg) {
                resp = {
                    status: 201,
                    msg: resp[0][0].msg,
                    packageName: resp[0][0].packName,
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
    billno: async (req, res) => {
        let shopID = req.params.shopID;
        let conn, resp;
        const zeroPad = (num, places) => String(num).padStart(places, '0')
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call billno(?)",
                [
                    shopID
                ]
            );
            // ຮັບເງື່ອນໄຂຕ່າງໆທີ່ດາຕ້າສົ່ງມາໃຫ້
            if (resp[0][0].msg == null) {
                resp[0][0].msg = "00001";
            }
            else {
                resp[0][0].msg = Number(resp[0][0].msg) + 1;
                resp[0][0].msg = zeroPad(resp[0][0].msg, 5);
            }
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
    UpdateStatus: async (req, res) => {
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call status_emp_room(?,?)",
                [
                    req?.body?.emp_id,
                    req?.body?.room_id,
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