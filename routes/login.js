const express = require("express");
const mongoose = require("mongoose");
const user = require("../models/story");
const router = express.Router();

mongoose.connect("mongodb://localhost:27017/PayAndRest", {
    useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (e) => console.error(e));
db.once("open", () => console.log("Connected to Mongoose-login"));

router.post("/api/login", async (req, res) => {
    const user = req.body;
    const query = {
        email: user.email,
        password: user.password,
    };

    db.collection("users")
        .find(query)
        .toArray(function (err, result) {
            if (result.length === 0) {
                res.status(209).send("Invalid credentials");
            } else if (
                result[0].role === user.role &&
                result[0].email === user.email &&
                result[0].password === user.password
            ) {
                res.status(200).send("Login Success");
            }
        });
});

module.exports = router;