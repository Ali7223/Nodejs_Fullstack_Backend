const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyJwt = (req, res, next) => {
    const authHeader = req.headers["authorization"] //|| req.headers["Authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.userId = decoded.id;
        req.userRole = decoded.role;
        console.log("Decoded JWT:", decoded);
        next();
    });
};
module.exports = verifyJwt;
