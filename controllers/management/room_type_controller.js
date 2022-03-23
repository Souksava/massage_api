const pool = require("../../connect");
module.exports = {
    InsertRoomType: async (req, res) => {
        let { roomTypeName, shopID } = req.body;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call room_type_insert(?,?)",
                [
                    roomTypeName,
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
    UpdateRoomType: async (req, res) => {
        let { roomID, roomTypeName, shopID } = req.body;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call room_type_update(?,?,?)",
                [
                    roomID,
                    roomTypeName,
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
    DeleteRoomType: async (req, res) => {
        let  id  = req.params.id;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call room_type_delete(?)",
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
    SelectRoomType: async (req, res) => {
        let search = req.params.search;
        let shopID = req.params.shopID;
        let page = req.params.page;
        let conn, resp;
        if(search == "null"){
            search = "";
        }
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call select_room_type_limit(?,?,?)",
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
            console.log(resp[0]);
            res.json(resp[0]);
        }
    },
    CountRoomType: async (req, res) => {
        let search = req.params.search;
        let shopID = req.params.shopID;
        let conn, resp;
        if(search == "null"){
            search = "";
        }
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call room_type_count(?,?)",
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