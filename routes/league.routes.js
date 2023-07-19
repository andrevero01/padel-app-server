const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const League = require("../models/League.model");
const Team = require("../models/Team.model");

//Create a new league
router.post("/", async (req, res, next) => {
  try {
    const league = await League.create(req.body);
    res.status(201).json(league);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Update a league
router.put("/:leagueId", async (req, res, next) => {
  const { leagueId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(leagueId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  try {
    const league = await League.findByIdAndUpdate(leagueId, req.body, {
      new: true,
    });
    if (league) {
      res.json(league);
    } else {
      res.status(404).json({ error: "League not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Get all leagues
router.get("/", async (req, res, next) => {
  try {
    const leagues = await League.find().populate("teams");
    res.json(leagues);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Get all leagues
router.get("/", async (req, res, next) => {
  try {
    const leagues = await League.find().populate("teams");
    res.json(leagues);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Get one league
router.get("/:leagueId", async (req, res, next) => {
  const { leagueId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(leagueId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  try {
    const league = await League.findById(leagueId).populate("teams");
    if (league) {
      res.json(league);
    } else {
      res.status(404).json({ error: "League not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Delete a league
router.delete("/:leagueId", async (req, res, next) => {
  const { leagueId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(leagueId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  try {
    const league = await League.findByIdAndRemove(leagueId);
    if (league) {
      res.json({ message: "League deleted successfully" });
    } else {
      res.status(404).json({ error: "League not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
