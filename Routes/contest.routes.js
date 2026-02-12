const express = require("express");
const router = express.Router();

const {
  getAllUserContests,
  getContestsByAdminId,
  getContestByContestId
} = require("../Controllers/contest.controller");

// Get all contests
router.get("/", getAllUserContests);

// Get contests by adminId
router.get("/admin", getContestsByAdminId);

// Get contest by contestId
router.get("/contest", getContestByContestId);

module.exports = router;
