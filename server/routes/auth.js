require("dotenv").config();
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

/**
 * Login endpoint
 * in: username & password
 * verify user exists
 * verify password matches
 * if yes -> return token
 * if no -> return 401
 */
router.post("/login", async (req, res) => {
    // getting the username & password from the body
    const { username, password } = req.body;

    // get the user by username 
    const user = await knex("users")
        .where({ email: username })
        .first();
    
    console.log(user);
    // make sure we have a user
    if(!user) {
        return res.status(401).json({
            message: 'combination of username/password is not found',
        });
    }

    // validate a password
    const isPasswordMatching = user.password === password;

    if(!isPasswordMatching) {
        return res.status(401).json({
            message: 'combination of username/password is not found',
        });
    }

    // generate the token
    // install jsonwebtoken library
    const token = jwt.sign({
        id: user.id,
        role: user.role
    }, process.env.SECRET_KEY);

    res.status(200).json({
        access_token: token,
    });
});

module.exports = router;