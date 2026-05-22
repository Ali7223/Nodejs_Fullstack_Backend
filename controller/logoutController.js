const User = require("../models/User");
const jwt = require("jsonwebtoken");

const logoutUser = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    return res.sendStatus(204); // No content
  }
  const foundUser = await User.findOne({ _id: req.userId }).exec();
  if (!foundUser) {
    res.clearCookie("refreshToken", { httpOnly: true });
    return res.sendStatus(204);
  }
  console.log("Found user for logout:", foundUser);
  res.clearCookie("refreshToken", { httpOnly: true });
  res.json({ message: "Logged out successfully" });
};

module.exports = { logoutUser };
