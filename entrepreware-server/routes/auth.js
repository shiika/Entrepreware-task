const express = require('express');
const router = express.Router();
const request = require("request");
const client = require("../models/client.model");

router.post("/verify", (req, res, next) => {
    request.post(`http://apilayer.net/api/validate?access_key=d7422ffcddeda28191c08e1ce29a9a1c&number=${req.body.phone}`, function (error, response, body) {
        let verifyDate = new Date(Date.now());

        verifyDate = `${verifyDate.getFullYear()}-${verifyDate.getMonth()}-${verifyDate.getDate()}`;

        client.saveRecord(response.body, verifyDate , (err, results) => {
            if (err) return next(err);
            res.send(response.body)
        });

    });
});

router.get("/history", (req, res, next) => {
    client.getHistory((err, phoneInfo) => {
        res.send(phoneInfo);
    })
});

module.exports = router;