require("dotenv").config();
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await knex("user")
        .where({ email: email })
        .first();

    if (!user) {
        return res.status(401).json({
            message: 'combination of email/password is not found',
        });
    }

    const isPasswordMatching = user.password === password;

    if (!isPasswordMatching) {
        return res.status(401).json({
            message: 'combination of email/password is not found',
        });
    }

    // generate the token
    const token = jwt.sign({
        id: user.id,
        role: user.role
    }, process.env.SECRET_KEY);

    res.status(200).json({
        access_token: token,
    });
});

router.post("/signup", async (req, res) => {
    const { name, email, password, phone } = req.body;

    const user = await knex("user")
        .insert(req.body)

    if (!name || !email || !password || !phone) {
        return res.status(401).json({
            message: 'combination of email/password is not found',
        });
    }

    const token = jwt.sign({
        id: user.id,
        role: user.role
    }, process.env.SECRET_KEY);

    res.status(200).json({
        access_token: token,
    });
});

module.exports = router;