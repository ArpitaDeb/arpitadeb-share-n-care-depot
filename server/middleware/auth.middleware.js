require("dotenv").config();
const jwt = require("jsonwebtoken");

const tokenVerify = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send('Unauthenticated');
    }
  const [prefix, token] = authorization.split(" ");

  if (prefix !== "Bearer") {
    return res.sendStatus(403);
  }
    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        req.userObj = payload;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send("Invalid token");
    }
}

const adminOnly = (req, res, next) => {
    if (req.userObj.role !== 'admin') {
       return res.status(403).send("No rights to access this")
    }
    next();
}
const userOnly = (req, res, next) => {
    if (req.userObj.role !== 'user' && req.userObj.role !== 'admin') {
       return res.status(403).send("No rights to access this")
    }
    next();
}

module.exports = {
    tokenVerify,
    adminOnly, 
    userOnly
};