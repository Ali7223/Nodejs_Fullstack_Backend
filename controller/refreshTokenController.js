const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const refreshToken = cookies.jwt;
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.sendStatus(403).json({ message: "Forbidden" });
        }
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || user._id.toString() !== decoded.id) {
                    return res.status(403).json({ message: "Forbidden" });
                }
                const accessToken = jwt.sign(
                    { id: user._id, role: user.role },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "15m" }
                );
                res.json({ accessToken });
            }
        );
    } catch (err) {
        return res.status(403).json({ message: "Forbidden" });
    }
};

module.exports =  {refreshToken }   ;