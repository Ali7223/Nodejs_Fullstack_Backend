const jwt = require("jsonwebtoken");
const users = require("../models/User");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const user = await users.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "unauthorized " });
    }
    console.log("USER:", user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const roles = user.role;
      const accessToken = jwt.sign(
        { id: user._id, role: roles },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" },
      );
      const refreshToken = jwt.sign(
        { id: user._id, role: roles },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" },
      );
     
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        //secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { loginUser };
