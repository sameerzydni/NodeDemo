require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");

const url = process.env.MongoDb_URL;
const app = express();
const router = express.Router();
const path = require("path");

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;
app.use(express.json());
app.use(cors());
app.use("/static/uploads", express.static(path.join(__dirname, "uploads")));

// CHECKING THE CONNECTION
con.on("open", function () {
  console.log("Connected...");
});

// Sample Router
const sampleRouter = require("./routers/sampleRouter");
app.use("/", sampleRouter);

// Listening to the port
const port = process.env.port || 9020;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
