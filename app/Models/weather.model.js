// user.model.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Users
let weather_tea = new Schema(
  {
    label: {
      type: String,
    },

    score: {
      type: Number,
    },

    ratio: {
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

    precipitation: {
      type: Number,
    },

    temp_max: {
      type: Number,
    },

    temp_min: {
      type: Number,
    },

    humidities: {
      type: [Number],
    },

    temps: {
      type: [Number],
    },

    rainfalls: {
      type: [Number],
    },

    detection_date: {
      type: Date,
    },

    wind: {
      type: Number,
    },

     todayWeatherClass: {
      type: String,
    },

    // 0 pending , 1 successful server detection , 2 failed or error server detection, 3 recommend for manual detections, 4 manual detection done
    status: {
      type: Number,
    },
  },

  {
    timestamps: true,
    collection: "weather_tea",
  }
);

module.exports = mongoose.model("weather_tea", weather_tea);
