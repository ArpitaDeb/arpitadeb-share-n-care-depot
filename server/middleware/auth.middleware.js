require("dotenv").config();
const jwt = require("jsonwebtoken");

const tokenVerify = (req, res, next) => {
    // validate the token
    //extracting the token from the headers
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send('Unauthenticated');
    }

    //verify the token
    const token = authorization.split(' ')[1];
    console.log(token);

    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        console.log(payload);

        //if it is valuid, call next(), passing the payload through
        // the role lookup potentially
        req.userObj = payload;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).send("Invalid token");
    }
}

// this makes sure that user has educator role
const educatorOnly = (req, res, next) => {
    if (req.userObj.role !== 'educator') {
       return res.status(403).send("No rights to access this")
    }

    next();
}

module.exports = {
    tokenVerify,
    educatorOnly
};