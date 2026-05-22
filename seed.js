const mongoose = require("mongoose");
const User = require("./models/User");
const ROLES_LIST = require("./config/roles_list");
const bcrypt = require("bcrypt");
require("dotenv").config();

const runSeed = async () => {
  try {
    const hashedPassword = await bcrypt.hash("1234", 10);
    const users = [
      {
        username: "admin",
        password: hashedPassword,
        roles: [ROLES_LIST.Admin, ROLES_LIST.User],
      },
    ];
    await mongoose.connect(process.env.MONGO_URI);

    console.log("DB Connected");

    await User.insertMany(users);
    const count = await User.countDocuments();
    console.log("TOTAL USERS IN DB:", count);

    console.log("DB Seeded");
  } catch (err) {
    console.log("Error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed");
  }
};

runSeed();
