const pool = require("../../connect");
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require("jsonwebtoken");
const { json } = require("express");
require("dotenv").config();

module.exports = {
  Signin: async (req, res) => {
    let { email, password } = req.body;
    let conn, resp;
    try {
      conn = await pool.getConnection();
      resp = await conn.query("call login(?)",
        [email]);
      if (resp[0][0].msg) {
        resp = {
          status: 201,
          msg: resp[0][0].msg
        }
      }
      else {
        const result = compareSync(password, resp[0][0].password);
        if (result) {
          resp[0][0].password = undefined;
          const jsontoken = sign({ result: resp }, process.env.Secret_key, {
            expiresIn: "8h"
          });
          resp = {
            status: 201,
            login: "success",
            token: jsontoken,
            msg: resp
          }
          // return res.json(resp);
        }
        else {
          resp = {
            status: 201,
            msg: "Invalid email or password compare false"
          }
          // return res.json(resp);
        }
      }
    } catch (error) {
      conn.end();
      return res.status(500).json(error);
    } finally {
      if (conn) conn.release();
      console.log(resp);
      res.json(resp);
    }
  },
  CheckData: async (req, res) => {
    let { email } = req.body;
    let conn, resp;
    try {
      conn = await pool.getConnection();
      resp = await conn.query("SELECT 'OK' AS message;",
        [email]);
      if (resp[0][0].message) {
        resp = {
          status: 201,
          message: resp[0][0].message
        }
      }
      else {
        resp = {
          status: 201,
          message: resp
        }
      }
    } catch (error) {
      conn.end();
    } finally {
      if (conn) conn.release();
      console.log(resp);
      res.json(resp);
    }
  },
}