const express = require("express");
const router = express.Router();
const Team = require("../models/Team.model");
const Player = require("../models/Player.model");

// Route: GET /api/teams
// Description: Get all teams
router.get("/teams", async (req, res) => {
  try {
    const teams = await Team.find().populate("players");
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: "Failed to get teams" });
  }
});

// Route: GET /api/teams/:id
// Description: Get a specific team by ID
router.get("/teams/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: "Failed to get team" });
  }
});

// Route: POST /api/teams
// Description: Create a new team
router.post("/teams", async (req, res) => {
  try {
    console.log(req.body);
    const team = await Team.create(req.body);

    // Update each player's teams array with the newly created team's ObjectId
    const playerIds = team.players.map((player) => player._id);
    await Player.updateMany(
      { _id: { $in: playerIds } },
      { $push: { team: team._id } }
    );

    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: req.body });
  }
});

// Route: PUT /api/teams/:id
// Description: Update a team by ID
router.put("/teams/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: "Failed to update team" });
  }
});

// Route: DELETE /api/teams/:id
// Description: Delete a team by ID
router.delete("/teams/:id", async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json({ message: "Team deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete team" });
  }
});

module.exports = router;
