// const { LoginModel } = require('../model/login_model');
const pool = require("../../connect");
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
module.exports = {
    InsertUsername: async (req, res) => {
        let { usernameid, userName, surname, email, password, sttID, shopID } = req.body;
        let conn, resp;
        let salt = genSaltSync(10);
        password = hashSync(req.body.password, salt); // ຮັບຈາກໜ້າບ້ານແລ້ວແປງລະຫັດໃຫ້ເປັນ Bcrypt
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call username_insert(?,?,?,?,?,?,?)",
                [
                    usernameid,
                    userName,
                    surname,
                    email,
                    password,
                    sttID,
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
    UpdateUsername: async (req, res) => {
        let { usernameid, userName, surname, email, sttID, userID, shopID } = req.body;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call username_update(?,?,?,?,?,?,?)",
                [
                    usernameid,
                    userName,
                    surname,
                    email,
                    sttID,
                    userID,
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
    DeleteUsername: async (req, res) => {
        let id = req.params.id;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call username_delete(?)",
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
    SelectUsername: async (req, res) => {
        let search = req.params.search;
        let shopID = req.params.shopID;
        let page = req.params.page;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call select_username_limit(?,?,?)",
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
    CountUsername: async (req, res) => {
        let search = req.params.search;
        let shopID = req.params.shopID;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call username_count(?,?)",
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
    AllUsername: async (req, res) => {
        let search = req.params.search;
        let shopID = req.params.shopID;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call select_username(?,?)",
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
    // userStatus: async (req, res) => {
    //     let conn, resp;
    //     try {
    //         conn = await pool.getConnection();
    //         resp = await conn.query("call statusUser_select()");
    //     } catch (error) {
    //         conn.end();
    //         return res.status(500).json(error);
    //     } finally {
    //         if (conn) conn.release();
    //         res.json(resp);
    //     }
    // },
}