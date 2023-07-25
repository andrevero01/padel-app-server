const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Player = require("../models/Player.model");
const saltRounds = 10;

// PLAYER SIGNUP
router.post("/", (req, res, next) => {
  const {
    email,
    password,
    role,
    firstName,
    lastName,
    age,
    gender,
    nationality,
    height,
    weight,
    dominantHand,
    backhandType,
    playingStyle,
    experienceLevel,
    coach,
  } = req.body;
  if (email === "" || password === "" || firstName === "" || lastName === "") {
    res
      .status(400)
      .json({ message: "Provide email, password, first and last name" });
    return;
  }
  Player.findOne({ email })
    .then((foundPlayer) => {
      // If the user with the same email already exists, send an error response
      if (foundPlayer) {
        res.status(400).json({ message: "Player already exists." });
        return;
      }
      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      // Create the new user in the database
      return Player.create({
        email,
        password: hashedPassword,
        role,
        firstName,
        lastName,
        age,
        gender,
        nationality,
        height,
        weight,
        dominantHand,
        backhandType,
        playingStyle,
        experienceLevel,
        coach,
      }).then((createdPlayer) => {
        // // Create a new object that doesn't expose the password
        // const player = {};

        // Send a json response containing the user object
        res.status(201).json({ createdPlayer });
      });
    })
    .catch((err) => next(err));
});

// Get all players
router.get("/", async (req, res) => {
  try {
    const players = await Player.find().populate("team");
    res.json(players);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single player by ID
router.get("/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate({
      path: "games",
      populate: {
        path: "teams.players", // Specify the correct path to the players field in teams array
        model: "Player", // Specify the model for the players field (Player model)
      },
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
