const pool = require("../db");
const config = require("config");

module.exports = {
    saveRecord: function(verifyRes, date, next) {
        const payload = JSON.parse(verifyRes);
        pool.query(`INSERT INTO clients SET validity = ?, phone = ?, verify_date = ?, country_code = ?, international_format = ?`,
        [
            payload.valid ? "valid" : "invalid", 
            payload.number,
            date,
            payload.country_code,
            payload.international_format
        ],
        (err, results) => {
            if (err) return next(err, null);

            return next(null, results);
        }
        )
    },

    getHistory: function(next) {
        pool.query(`
            SELECT validity, phone, country_code, verify_date
            FROM clients
        `,
        (err, results) => {
            if (err) return next(err, null);

            return next(null, results);
        })
    }
}