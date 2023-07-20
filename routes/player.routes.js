const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
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

// PLAYER LOGIN
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }
  // Check the users collection if a user with the same email exists
  Player.findOne({ email })
    .then((foundPlayer) => {
      if (!foundPlayer) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "Player not found." });
        return;
      }
      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(
        password,
        foundPlayer.password
      );
      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { email, firstName, lastName } = foundPlayer;
        // Create an object that will be set as the token payload
        const payload = { email, firstName, lastName };
        // Create a JSON Web Token and sign it
        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET || "y0uRt0k3N$eCr3T",
          {
            algorithm: "HS256",
            expiresIn: "6h",
          }
        );
        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the player" });
      }
    })
    .catch((error) => res.status(500).json(error.message)); // In this case, we send error handling to the error handling middleware.
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
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
