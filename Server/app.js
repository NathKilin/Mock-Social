const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary").v2;

// routs
const usersRoute = require("./routes/usersRoute.js");
const postsRouter = require("./routes/postRouter.js");
const commentsRouter = require("./routes/commentRouter.js");
const likesRouter = require("./routes/likesRouter.js");
const savedPostsRouter = require("./routes/savedPostsRouter.js");

const cors = require("cors");

dotenv.config();

// setting up Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true, // ensures HTTPS URLs for media files.
});

mongoose.connect(process.env.URI).then(() => {
  console.log("connected");
});

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from the frontend URL.
    credentials: true, // Enable credentials (e.g., cookies) in cross-origin requests.
  })
);

app.get("/api/status", (req, res) => {
  res.send({ status: "Server is running" });
});

//users routes
app.use("/api/user", usersRoute);

app.use("/api/posts", postsRouter);

app.use("/api/comments", commentsRouter);

app.use("/api/likes", likesRouter);

app.use("/api/saved_posts", savedPostsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port${PORT}`);
});
