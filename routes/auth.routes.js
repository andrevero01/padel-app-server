const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const Player = require("../models/Player.model");

// POST - Player login
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }
  Player.findOne({ email })
    .then((foundPlayer) => {
      if (!foundPlayer) {
        res.status(401).json({ message: "Player not found." });
        return;
      }
      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(
        password,
        foundPlayer.password
      );
      if (passwordCorrect) {
        const { _id, email, firstName, lastName } = foundPlayer;
        const payload = { _id, email, firstName, lastName };
        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET || "1r0Nh4cKP@d3!",
          {
            algorithm: "HS256",
            expiresIn: "6h",
          }
        );
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the player" });
      }
    })
    .catch((error) => res.status(500).json(error.message));
});

// GET - verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload);
  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});

module.exports = router;
