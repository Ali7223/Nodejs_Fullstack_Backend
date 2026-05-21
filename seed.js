const mongoose = require("mongoose");
const User = require("./models/User");
console.log("USER IMPORT:", User);
console.log("TYPE:", typeof User);
require("dotenv").config();

const users = [
  { username: "admin", password: "1234", role: "admin" },
  { username: "john", password: "1234", role: "user" }
];

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("DB Connected");

    await User.deleteMany({});
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