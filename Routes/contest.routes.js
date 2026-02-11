const express = require("express");
const router = express.Router();

const { getAllUserContests } = require("../Controllers/contest.controller");

router.get("/", getAllUserContests);

module.exports = router;
