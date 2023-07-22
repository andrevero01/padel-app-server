const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const League = require("../models/League.model");
const Team = require("../models/Team.model");

//POST Create a new league
router.post("/", async (req, res, next) => {
  try {
    const league = await League.create(req.body);
    res.status(201).json(league);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//PUT Update league
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

//GET all leagues
router.get("/", async (req, res, next) => {
  try {
    const leagues = await League.find().populate("teams");
    res.json(leagues);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//GET one league
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

//DELETE league
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

//POST Join a league
router.post("/leagues/:leagueId/join", async (req, res) => {
  const { leagueId } = req.params;
  const playerId = req.player.id;

  try {
    // Fetch the league from the database
    const league = await League.findById(leagueId);

    if (!league) {
      return res.status(404).json({ error: "League not found." });
    }

    // Check if the league's registration is open
    if (!league.registrationOpen) {
      return res.status(403).json({ error: "League registration is closed." });
    }

    // Check if the user is already a member of the league
    if (league.teams.some((team) => team.players.includes(playerId))) {
      return res
        .status(409)
        .json({ error: "You are already a member of this league." });
    }

    // Add the user's ID to the "teams" array of the league
    league.teams.push({ players: [playerId] });
    await league.save();

    return res.json({ message: "Successfully joined the league." });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred while joining the league." });
  }
});

module.exports = router;
