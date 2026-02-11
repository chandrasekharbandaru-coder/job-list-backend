const Contest = require("../Model/contest.model");

exports.getAllUserContests = async (req, res) => {
  try {
    const { status } = req.query;

    // Dynamic filter
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
