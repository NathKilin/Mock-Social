const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const usersRoute = require("./routes/usersRoute.js");

dotenv.config();

mongoose.connect(process.env.URI).then(() => {
  console.log("connected");
});

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("tiny"));
// app.use(cors());

app.get("/api/status", (req, res) => {
  res.send({ status: "Server is running" });
});

//users routes
app.use("/api/user", usersRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port${PORT}`);
});
