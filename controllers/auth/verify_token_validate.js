const { verify } = require('jsonwebtoken');
require("dotenv").config();
module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        let resp;
        if (token) {
            token = token.slice(7);
            verify(token, process.env.Secret_key, (err, decoded) => {
                if (err) {
                    resp = {
                        success: 0,
                        message: "Invalid Token"
                    }
                    res.json(resp);
                    console.log(resp);
                }
                else {
                    next();
                }
            });
        } else {
            resp = {
                success: 0,
                message: "no token"
            }
            res.json(resp);
            console.log(resp);

        }
    }
}