// const { LoginModel } = require('../model/login_model');
const pool = require("../../connect");
module.exports = {
    InsertRoom: async (req, res) => {
        let { roomNumber, qtyBed, roomTypeID, shopID } = req.body;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call room_insert(?,?,?,?)",
                [
                    roomNumber, qtyBed, roomTypeID, shopID
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
    UpdateRoom: async (req, res) => {
        let { roomNumber, qtyBed, roomTypeID, shopID, roomID } = req.body;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call room_update(?,?,?,?,?)",
                [
                    roomNumber, qtyBed, roomTypeID, shopID, roomID
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
    DeleteRoom: async (req, res) => {
        let id = req.params.id;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call room_delete(?)",
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
    SelectRoom: async (req, res) => {
        let search = req.params.search;
        let shopID = req.params.shopID;
        let page = req.params.page;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call select_room_limit(?,?,?)",
                [
                    "%" + search + "%",
                    shopID,
                    page
                ]
            );
        } catch (error) {
            conn.end();
            return res.status(500).json(error);
        } finally {
            if (conn) conn.release();
            res.json(resp[0]);
        }
    },
    CountRoom: async (req, res) => {
        let search = req.params.search;
        let shopID = req.params.shopID;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call select_room_count(?,?)",
                [
                    "%" + search + "%",
                    shopID
                ]
            );
        } catch (error) {
            conn.end();
            return res.status(500).json(error);
        } finally {
            if (conn) conn.release();
            res.json(resp[0]);
        }
    },
    AllRoom: async (req, res) => {
        let search = req.params.search;
        let shopID = req.params.shopID;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call select_room(?,?)",
                [
                    "%" + search + "%",
                    shopID
                ]
            );
        } catch (error) {
            conn.end();
            return res.status(500).json(error);
        } finally {
            if (conn) conn.release();
            res.json(resp[0]);
        }
    },
}