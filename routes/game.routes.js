const express = require("express");
const router = express.Router();
const Game = require("../models/Game.model");

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

// Create a new game

router.post("/", async (req, res) => {
  const game = new Game({
    player1: req.body.player1,
    player2: req.body.player2,
    player3: req.body.player3,
    player4: req.body.player4,
    court: req.body.court,
    league: req.body.league,
    team1: req.body.team1,
    team2: req.body.team2,
    dateTime: req.body.dateTime,
    score: req.body.score,
    winner: req.body.winner,
    duration: req.body.duration,
  });

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a game
router.patch("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (game) {
      game.player1 = req.body.player1;
      game.player2 = req.body.player2;
      game.court = req.body.court;
      game.league = req.body.league;
      game.team1 = req.body.team1;
      game.team2 = req.body.team2;
      game.dateTime = req.body.dateTime;
      game.score = req.body.score;
      game.winner = req.body.winner;
      game.duration = req.body.duration;

      const updatedGame = await game.save();
      res.json(updatedGame);
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
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
