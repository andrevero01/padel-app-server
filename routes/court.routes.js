const express = require("express");
const router = express.Router();
const Court = require("../models/Court.model");

router.get("/courts", async (req, res) => {
  try {
    const courts = await Court.find();
    res.json(courts);
  } catch (error) {
    res.status(500).json({ error: "Failed to get court" });
  }
});

// Route: GET /api/courts/:id
// Description: Get a specific team by ID
router.get("/courts/:id", async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);
    if (!court) {
      return res.status(404).json({ error: "Court not found" });
    }
    res.json(court);
  } catch (error) {
    res.status(500).json({ error: "Failed to get court" });
  }
});

// Route: POST /api/courts
// Description: Create a new court
router.post("/courts", async (req, res) => {
  try {
    console.log(req.body);
    const court = await Court.create(req.body);
    res.status(201).json(court);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route: PUT /api/courts/:id
// Description: Update a court by ID
router.put("/courts/:id", async (req, res) => {
  try {
    const court = await Court.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!court) {
      return res.status(404).json({ error: "Court not found" });
    }
    res.json(court);
  } catch (error) {
    res.status(500).json({ error: "Failed to update court" });
  }
});

// Route: DELETE /api/courts/:id
// Description: Delete a court by ID
router.delete("/courts/:id", async (req, res) => {
  try {
    const court = await Court.findByIdAndDelete(req.params.id);
    if (!court) {
      return res.status(404).json({ error: "Court not found" });
    }
    res.json({ message: "Court deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete court" });
  }
});

module.exports = router;
