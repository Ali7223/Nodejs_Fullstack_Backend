const whiteList = [
  "http://localhost:3000",
  "http://localhost:3500",
  "http://127.0.0.1:3000"
];

const corsOptions = {
  origin: (origin, callback) => {
    console.log("Origin received:", origin);

    if (!origin) {
      return callback(null, true); // allow Postman / Thunder Client
    }

    if (whiteList.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not Allowed by Cors"));
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;