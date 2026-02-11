const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema(
  {
    contestId: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    adminId: mongoose.Schema.Types.ObjectId,

    contestStatus: {
      type: String,
      enum: ["Drafted", "In-Review", "Active", "On Hold", "Completed"],
      default: "Drafted"
    },

    details: Object,
    visibility: Object,
    driveAvailiability: Object,
    contestPlan: Object
  },
  {
    timestamps: true,
    collection: "contests",
    strict: false
  }
);

module.exports = mongoose.model("Contest", contestSchema);
