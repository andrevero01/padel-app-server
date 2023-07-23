const express = require("express");
const router = express.Router();
const Game = require("../models/Game.model");
const Player = require("../models/Player.model");

// Get all games

router.get("/", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific game
router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post a game
router.post("/", async (req, res) => {
  try {
    const { teams } = req.body;
    const game = await Game.create(req.body);

    for (const team of teams) {
      for (const player of team.players) {
        await Player.findByIdAndUpdate(player, {
          $push: { games: game._id },
        });
        const winningTeam = game.teams.find((team) => team.winner === true);
        if (winningTeam) {
          await Player.findByIdAndUpdate(player, {
            $push: { gamesWon: game._id },
          });
        }
      }
    }

    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a game
router.put("/:id", async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: "Failed to update game" });
  }
});

// Delete a game

router.delete("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (game) {
      await game.remove();
      res.json({ message: "Game deleted" });
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
