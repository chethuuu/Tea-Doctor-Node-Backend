// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Users
let detection_stem_disease_tea = new Schema(
  {
    label: {
      type: String,
    },

    score: {
      type: Number,
    },

    ratio: {
      type: String,
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

    imgURL: {
      type: String,
    },

    // 0 pending , 1 successful server detection , 2 failed or error server detection, 3 recommend for manual detections, 4 manual detection done
    status: {
      type: Number,
    },
  },

  {
    timestamps: true,
    collection: "detection_stem_disease_tea",
  }
);

module.exports = mongoose.model(
  "detection_stem_disease_tea",
  detection_stem_disease_tea
);
