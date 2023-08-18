const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  package: String,
  color: String,
  year: String,
  category: String,
  mileage: String,
  price: String,
  filename: String,
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
