// const { LoginModel } = require('../model/login_model');
const pool = require("../../connect");
module.exports = {
    InsertPerzen: async (req, res) => {
        let { packID, prices, shopID } = req.body;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call perzen_massage_insert(?,?,?)",
                [
                    packID, prices, shopID
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
    UpdatePerzen: async (req, res) => {
        let { perzeID, packID, prices, shopID } = req.body;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call perzen_massage_update(?,?,?,?)",
                [
                    perzeID, packID, prices, shopID
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
    DeletePerzen: async (req, res) => {
        let perzeID = req.params.perzeID;
        let shopID = req.params.shopID;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call perzen_massage_delete(?,?)",
                [
                    perzeID,
                    shopID
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
    SelectPerzen: async (req, res) => {
        let search = req.params.search;
        let shopID = req.params.shopID;
        let page = req.params.page;
        let conn, resp;
        if (search == "null") {
            search = "";
        }
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call select_perzen_massage_limit(?,?,?)",
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
    CountPerzen: async (req, res) => {
        let search = req.params.search;
        let shopID = req.params.shopID;
        let conn, resp;
        if (search == "null") {
            search = "";
        }
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call select_count_perzen(?,?)",
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
    AllPerzen: async (req, res) => {
        let search = req.params.search;
        let shopID = req.params.shopID;
        let conn, resp;
        if (search == "null") {
            search = "";
        }
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call select_perzen_massage(?,?)",
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