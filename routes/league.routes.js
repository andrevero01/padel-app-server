const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const League = require("../models/League.model");
const Team = require("../models/Team.model");
const Player = require("../models/Player.model");

//POST Create a new league
router.post("/", async (req, res, next) => {
  const {
    name,
    location,
    schedule,
    leagueLogo,
    registrationOpen,
    registrationDeadline,
    registrationFee,
    createdBy,
  } = req.body;
  try {
    const league = await League.create({
      name,
      location,
      schedule,
      leagueLogo,
      registrationOpen,
      registrationDeadline,
      registrationFee,
      createdBy,
    });
    console.log("created by", createdBy);
    res.status(201).json(league);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// router.post("/", (req, res, next) => {
//   const {
//     name,
//     location,
//     schedule,
//     leagueLogo,
//     registrationOpen,
//     registrationDeadline,
//     registrationFee,
//     createdBy,
//   } = req.body;
//   League.create({
//     name,
//     location,
//     schedule,
//     leagueLogo,
//     registrationOpen,
//     registrationDeadline,
//     registrationFee,
//     createdBy,
//   })
//     .then(() => {
//       console.log("created by", createdBy);
//     })

//     .catch((error) => {
//       console.log("error", error.message);
//     });
// });

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
    const leagues = await League.find().populate("teams").populate("players");
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
    const league = await League.findById(leagueId)
      .populate("teams")
      .populate("players");
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
router.post("/:leagueId/join", async (req, res) => {
  const { leagueId } = req.params;
  const { playerId } = req.body;

  try {
    const [league, player] = await Promise.all([
      League.findById(leagueId).populate("teams").populate("players"),
      Player.findById(playerId).populate("leagues"),
    ]);
    console.log("player id", playerId);

    if (!league || !player) {
      return res.status(404).json({ error: "League or Player not found." });
    }

    if (!league.registrationOpen) {
      return res.status(403).json({ error: "League registration is closed." });
    }
    if (league.players.find((player) => player.id === playerId)) {
      return res
        .status(409)
        .json({ error: "You are already a member of this league." });
    } else if (league.teams.find((player) => player.id === playerId)) {
      return res
        .status(409)
        .json({ error: "Your team is already a member of this league." });
    }

    league.players.push(playerId);
    await league.save();
    player.leagues.push(leagueId);
    await player.save();
    league.teams.push(leagueId);
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
