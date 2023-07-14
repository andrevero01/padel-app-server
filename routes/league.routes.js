const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const League = require("../models/League.model");
const Team = require("../models/Team.model");

//Create a new league
router.post("/leagues", (req, res, next) => {
  const { name, courts } = req.body;
  League.create({ name, courts, teams: [] })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//Update a league
router.put("/leagues/:leagueId", (req, res, next) => {
  const { leagueId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(leagueId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  League.findByIdAndUpdate(leagueId, req.body, { new: true })
    .then((updatedLeague) => res.json(updatedLeague))
    .catch((error) => res.json(error));
});

//Get all leagues
router.get("/leagues", (req, res, next) => {
  League.find()
    .populate("teams")
    .then((allLeagues) => res.json(allLeagues))
    .catch((err) => res.json(err));
});

//Get one league
router.get("/leagues/:leagueId", (req, res, next) => {
  const { leagueId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(leagueId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  League.findById(leagueId)
    .populate("teams")
    .then((league) => res.status(200).json(league))
    .catch((error) => res.json(error));
});

//Delete a league
router.delete("/leagues/:leagueId", (req, res, next) => {
  const { leagueId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(leagueId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  League.findByIdAndRemove(leagueId)
    .then(() =>
      res.json({ message: `League with id: ${leagueId} removed successfully.` })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
