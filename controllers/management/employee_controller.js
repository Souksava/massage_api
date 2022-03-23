// const { LoginModel } = require('../model/login_model');
const pool = require("../../connect");
module.exports = {
    InsertEmployee: async (req, res) => {
        let { employeeID, empName, empSurname, gender, tel, address, shopID } = req.body;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call employee_insert(?,?,?,?,?,?,?)",
                [
                    employeeID,
                    empName,
                    empSurname,
                    gender,
                    tel,
                    address,
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
    UpdateEmployee: async (req, res) => {
        let { employeeID, empName, empSurname, gender, tel, address, shopID, empID } = req.body;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call employee_update(?,?,?,?,?,?,?,?)",
                [
                    employeeID, empName, empSurname, gender, tel, address, shopID, empID
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
    DeleteEmployee: async (req, res) => {
        let id = req.params.id;
        let conn, resp;
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call employee_delete(?)",
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
    SelectEmployee: async (req, res) => {
        let search = req.params.search;
        let shopID = req.params.shopID;
        let page = req.params.page;
        let conn, resp;
        if(search == "null"){
            search = "";
        }
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call select_employee_limit(?,?,?)",
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
    CountEmployee: async (req, res) => {
        let search = req.params.search;
        let shopID = req.params.shopID;
        let conn, resp;
        if(search == "null"){
            search = "";
        }
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call select_employee_count(?,?)",
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
    AllEmployee: async (req, res) => {
        let search = req.params.search;
        let shopID = req.params.shopID;
        let conn, resp;
        if(search == "null"){
            search = "";
        }
        try {
            conn = await pool.getConnection();
            resp = await conn.query("call select_employee(?,?)",
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