const express = require("express");
const router = express.Router();
const Player  = require("../models/Player.model");

// Create a player
router.post("/", async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all players
router.get("/", async (req, res) => {
  try {
    const players = await Player.find().populate("team")    ;
    res.json(players);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single player by ID
router.get("/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (player) {
      res.json(player);
    } else {
      res.status(404).json({ error: "Player not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Invite player to a team
router.post("/players/invite/:playerId", async (req, res) => {
  try {
    const { playerId } = req.params;
    const { teamId } = req.body;

    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    player.team.push(team);
    await player.save();

    res.json({ message: "Player invited successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a player
router.put("/:id", async (req, res) => {
  try {
    const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (player) {
      res.json(player);
    } else {
      res.status(404).json({ error: "Player not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a player
router.delete("/:id", async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (player) {
      res.json({ message: "Player deleted successfully" });
    } else {
      res.status(404).json({ error: "Player not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
