require("dotenv").config();
const knex = require("knex")(require("../knexfile"));
const express = require("express");
const router = express.Router();
const { tokenVerify, userOnly } = require("../middleware/auth.middleware");

router.get("/",
    tokenVerify,
    userOnly,
    async (req, res) => {
        const user = await knex("user")
            .where({ id: req.userObj.id })
            .first();

        res.status(200).json({
            name: user.name,
            email: user.email,
            role: user.role,
        });
    });

module.exports = router;