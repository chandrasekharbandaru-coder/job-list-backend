const mongoose = require("mongoose");
const Contest = require("../Model/contest.model");
//Get All Contests
exports.getAllUserContests = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status) {
      filter.contestStatus = status;
    }

    const contests = await Contest.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contests.length,
      data: contests
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



//Get Contests By AdminId (Fixed)
exports.getContestsByAdminId = async (req, res) => {
  try {
    const { adminId } = req.query;

    if (!adminId) {
      return res.status(400).json({
        success: false,
        message: "adminId is required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid adminId"
      });
    }

    const contests = await Contest.find({
      adminId: new mongoose.Types.ObjectId(adminId)
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contests.length,
      data: contests
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// contestId + title + experience + budget
exports.getContestByContestId = async (req, res) => {
  try {
    const { contestId, title, experience, budget, position } = req.query;

    // Validate contestId
    if (!contestId) {
      return res.status(400).json({
        success: false,
        message: "contestId is required"
      });
    }

    // Base filter
    const filter = {
      contestId: contestId.toString().trim()
    };

    // Title filter (case insensitive)
    if (title) {
      filter["details.jobDetails.jobTitle"] = {
        $regex: title.trim(),
        $options: "i"
      };
    }

    // Experience filter
    if (experience) {
      filter["details.jobDetails.experience"] = {
        $regex: experience.trim(),
        $options: "i"
      };
    }

    // Budget filter
    if (budget) {
      filter["details.jobDetails.budget"] = {
        $regex: budget.trim(),
        $options: "i"
      };
    }

    //Position filter (Exact match because it is Number)
    if (position) {
      filter["details.jobDetails.noOfPositions"] = Number(position);
    }

    // Find contest
    const contest = await Contest.findOne(filter);

    if (!contest) {
      return res.status(404).json({
        success: false,
        message: "Contest not found"
      });
    }

    res.status(200).json({
      success: true,
      data: contest
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// Get Contests By Position
exports.getContestsByPosition = async (req, res) => {
  try {
    const { position } = req.query;

    // Check if position is provided
    if (!position) {
      return res.status(400).json({
        success: false,
        message: "position query param is required"
      });
    }

    // Check if position is a number
    if (isNaN(position)) {
      return res.status(400).json({
        success: false,
        message: "position must be a valid number"
      });
    }

    const contests = await Contest.find({
      "details.jobDetails.noOfPositions": Number(position)
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: contests.length,
      data: contests
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
