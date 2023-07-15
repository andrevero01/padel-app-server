const express = require("express");
const router = express.Router();
const Team = require("../models/Team.model");

// Route: GET /api/teams
// Description: Get all teams
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find().populate("players")
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: "Failed to get teams" });
  }
});

// Route: GET /api/teams/:id
// Description: Get a specific team by ID
router.get("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: "Failed to create team" });
  }
});

// Route: PUT /api/teams/:id
// Description: Update a team by ID
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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
