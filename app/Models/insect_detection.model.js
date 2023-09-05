// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Users
let insect_detection_tea = new Schema(
  {


    count: {
      type: Number,
    },

    lang: {
      type: Number,
    },
    long: {
      type: Number,
    },

    user_Id: {
      type: String,
    },

    audioURL: {
      type: String,
    },

    // 0 pending , 1 successful server detection , 2 failed or error server detection, 3 recommend for manual detections, 4 manual detection done
    status: {
      type: Number,
    },
  },

  {
    timestamps: true,
    collection: "insect_detection_tea",
  }
);

module.exports = mongoose.model("insect_detection_tea", insect_detection_tea);
