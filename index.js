const express = require("express");
const mongoose = require("mongoose");
const carRoutes = require("./routes/carRoutes.js");
const cors = require("cors");
const morgan = require("morgan");

mongoose.connect(
  "mongodb+srv://jcrr1985:Tumama4$@cluster0.zi7qsgn.mongodb.net/fullapp",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

app.use("/", carRoutes);

app.use("/uploads", express.static("uploads"));
const port = 3000;
app.listen(3000, () => console.log(`Server is running on port ${port}`));
