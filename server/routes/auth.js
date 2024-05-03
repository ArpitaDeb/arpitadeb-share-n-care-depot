const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile'));
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await knex('user')
        .where({ email: email })
        .first();

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({
            message: 'Invalid email/password combination',
        });
    }

    const token = jwt.sign({
        id: user.id,
        role: user.role
    }, process.env.SECRET_KEY);

    res.status(200).json({
        access_token: token,
        role: user.role,
    });
});

router.post('/signup', async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({
            message: 'All fields are required',
        });
    }

    const existingUser = await knex('user')
        .where({ email: email })
        .first();

    if (existingUser) {
        return res.status(400).json({
            message: 'User with this email already exists',
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [userId] = await knex('user').insert({
        name,
        email,
        password: hashedPassword,
        phone
    });

    const newUser = await knex('user').where({ id: userId }).first();

    const token = jwt.sign({
        id: newUser.id,
        role: newUser.role
    }, process.env.SECRET_KEY);

    res.status(200).json({
        access_token: token,
        role: newUser.role,
    });
});

module.exports = router;
