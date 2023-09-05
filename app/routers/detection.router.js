let express = require("express");
let router = express.Router();
let upload = require("../config/multer.config.js");

const axios = require("axios");
var stream = require("stream");
require("dotenv").config();

const awsWorker = require("../controllers/aws.controller.js");

let blisterModel = require("../Models/blister_disease.model.js");
let stemModel = require("../Models/stem_disease.model.js");

let WeatherModel = require("../Models/weather.model.js");
const insect_detectionModel = require("../Models/insect_detection.model.js");

// let user = require("../Models/user.model");

router.post("/detect-weather", async (req, res) => {
  let avg_rainfall = 10;
  let avg_temperature = 11;


  let lang = req.body.lang;
  let long = req.body.long;

  let flaskdata;

  await axios
    .get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lang}%2C${long}?unitGroup=metric&key=4VD6MJSJHGLXXHNZ585M36F5A&contentType=json`
    )
    .then((wRes) => {
      console.log("==========Weather API data Response is============");
      console.log(wRes.data.currentConditions);
      avg_rainfall = wRes.data.currentConditions.precip * 1000;
      avg_temperature = wRes.data.currentConditions.temp;
      console.log("====================================");
    });

  // let date1 = new Date().getTime();

  // let datee = new Date("06/01/2023").getTime();

  // if (date1 < datee) {
  //   season = "Yala";
  // } else {
  //   season = "Maha";
  // }

  // temp var

  // get humidity from sensor

  // delete
  let soil_ph = 10;
  let light_exposure = 30;
  let soil_moisture = 20;
  let humidity = 32;
  let temperature = avg_temperature;
  let rainfall = avg_rainfall;

  // delete

  // await newDetection
  //   .save()
  //   .then(async (respond) => {
  // flask server

  //       'Soil pH': [9.8],
  // 'Soil Moisture': [0.6],
  // 'Temperature': [32],
  // 'Humidity': [90.0],
  // 'Rainfall': [1000.0]

  //

  // return res.status(200).json({
  //   // crop: crop,
  //   area: 400,

  //   avg_rainfall: 3,
  //   moisture: 2,
  //   humidity: 45,
  //   ph: 5,
  //   temperature: 32,
  //   season: "yala",
  //   yield: 674,
  // });

  //

  precipitation = req.body.precipitation;
  temp_max = req.body.temp_max;
  temp_min = req.body.temp_min;
  wind = req.body.wind;
  today = req.body.today;

  // await axios
  //   .post(process.env.FLASKBACKEND + `/predict/tea-weather`, {
  //     soil_ph: soil_ph,
  //     soil_moisture: soil_moisture,
  //     light_exposure: light_exposure,
  //     humidity: humidity,
  //     temperature: temperature,
  //     rainfall: rainfall,
  //     lang: req.body.lang,
  //     long: req.body.long,

  //     // crop: crop,
  //   })
  //   .then(async (flaskRes) => {
  //     flaskdata = flaskRes;
  //     console.log("==========Flask Response is============");
  //     console.log(flaskRes);
  //     console.log("====================================");

  //     const detectionObj = new WeatherModel({
  //       lang: req.body.lang,
  //       long: req.body.long,
  //       user_Id: req.body.user_Id,
  //       soil_ph,
  //       soil_moisture,
  //       light_exposure,
  //       humidity,
  //       temperature,
  //       rainfall,
  //       yield: flaskdata.data.yield,
  //     });
  //     // .then(async (detectionObj) => {
  //     //   // detectionObj.crop = crop;
  //     //   detectionObj.yield = flaskRes.data.yield_value;

  //     //   console.log("detection obj");
  //     //   console.log(detectionObj);

  //     await detectionObj
  //       .save()
  //       .then((detectionObj) => {
  //         return res.status(200).json({ data: detectionObj });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         return res.status(400).json("Erro " + err);
  //       });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return res.status(400).json("Erro " + err);
  //   });

  const detectionObj = new WeatherModel({
    precipitation,
    temp_max,
    temp_min,
    wind,
    detection_date: today,
    temps: [32, 32, 29, 27, 32],
    rainfalls: [0, 0, 8.5, 18.3, 32.8],
    humidities: [96, 97, 98, 99, 96],
    todayWeatherClass:"rainy"
  });

  await detectionObj
    .save()
    .then((detectionObj) => {
      return res.status(200).json({ data: detectionObj });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json("Erro " + err);
    });
});

// get npk detections by user

router.route("/blister-detetions-by-user/:id").get(function (req, res) {
  let id = req.params.id;
  blisterModel.find({ user_Id: id }, function (err, Detections) {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json({ success: true, data: Detections });
    }
  });
});

// get disease detections by user

router.route("/stem-detetions-by-user/:id").get(function (req, res) {
  let id = req.params.id;
  stemModel.find({ user_Id: id }, function (err, Detections) {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json({ success: true, data: Detections });
    }
  });
});


router.route("/insect-detetions-by-user/:id").get(function (req, res) {
  let id = req.params.id;
  insect_detectionModel.find({ user_Id: id }, function (err, Detections) {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json({ success: true, data: Detections });
    }
  });
});

router.route("/weather-detetions-by-user/:id").get(function (req, res) {
  let id = req.params.id;
  WeatherModel.find({ user_Id: id }, function (err, Detections) {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json({ success: true, data: Detections });
    }
  });
});

router.route("/weather-detetions").get(function (req, res) {
  WeatherModel.find(function (err, Detections) {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json({ success: true, data: Detections });
    }
  });
});

// get one data

router.route("/stem-disease/:id").get(function (req, res) {
  let id = req.params.id;
  stemModel.findOne({ _id: id }, function (err, Detections) {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json({ success: true, data: Detections });
    }
  });
});

router.route("/stem-disease").get(function (req, res) {
  stemModel.find(function (err, Detections) {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json({ success: true, data: Detections });
    }
  });
});

router.route("/blister-disease/:id").get(function (req, res) {
  let id = req.params.id;
  blisterModel.findOne({ _id: id }, function (err, Detections) {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json({ success: true, data: Detections });
    }
  });
});

router.route("/insect-detection/:id").get(function (req, res) {
  let id = req.params.id;
  insect_detectionModel.findOne({ _id: id }, function (err, Detections) {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json({ success: true, data: Detections });
    }
  });
});

router.route("/blister-disease").get(function (req, res) {
  blisterModel.find(function (err, Detections) {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json({ success: true, data: Detections });
    }
  });
});

router.route("/insect-detections").get(function (req, res) {
  insect_detectionModel.find(function (err, Detections) {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json({ success: true, data: Detections });
    }
  });
});

router.post("/uproute", upload.single("file"), awsWorker.doUpload);

module.exports = router;
