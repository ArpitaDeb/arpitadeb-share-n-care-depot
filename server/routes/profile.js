require("dotenv").config();
const knex = require("knex")(require("../knexfile"));
const express = require("express");
const router = express.Router();
const { tokenVerify, educatorOnly } = require("../middleware/auth.middleware");

/**
 * Endpoint to get user profile
 * Can only be accessed with the token
 */
router.get("/",
    tokenVerify,
    //educatorOnly,
    async (req, res) => {
        // proceed with the logic of the endpoint
        const user = await knex("users")
            .where({ id: req.userObj.id })
            .first();

        console.log('profile', user)
        
        //good place to make sure user exists

        res.status(200).json({
            firstName: user.name,
            email: user.email,
            role: user.role,
        });
});

module.exports = router;