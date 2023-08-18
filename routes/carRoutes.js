const express = require("express");
const Car = require("../models/car.js");
const multer = require("multer");
const path = require("path");

const router = express.Router();

router.get("/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/cars/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      res.status(404).json({ message: "car not found" });
    }
    res.json(car);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ message: error.message });
  }
});

router.put("/cars/:id", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      hireDate,
      department,
      phone,
      address,
      isActive,
    } = req.body;
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, hireDate, department, phone, address, isActive },
      { new: true }
    );

    if (!updatedCar) {
      res.status(404).json({ message: "car not found" });
    }
    res.json(updatedCar);
  } catch (error) {
    console.log("error.message", error.message);
    res.status(500).json({ message: error.message });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

router.post("/cars", upload.single("image"), async (req, res) => {
  const { make, model, package, color, year, category, mileage, price, id } =
    req.body;

  const { filename } = req.file;

  const car = new Car({
    make,
    model,
    package,
    color,
    year,
    category,
    mileage,
    price,
    id,
    filename,
  });

  try {
    const createdCar = await car.save();
    res.status(201).json(createdCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/Cars/:id", async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(deletedCar);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error deleting car" });
  }
});

module.exports = router;
