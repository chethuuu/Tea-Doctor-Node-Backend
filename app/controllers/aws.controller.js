const axios = require("axios");

var stream = require("stream");
require("dotenv").config();

const s3 = require("../config/s3.config.js");
let BlisterModel = require("../Models/blister_disease.model.js");
let StemModel = require("../Models/stem_disease.model.js");
let InsectModel = require("../Models/insect_detection.model.js");
let user = require("../Models/user.model");
const { log } = require("console");

exports.doUpload = (req, res) => {
  const s3Client = s3.s3Client;
  const params = s3.uploadParams;

  let user_Id = req.body.user_Id;

  let lang = req.body.lang;
  let long = req.body.long;

  let status = 0;

  params.Key = req.file.originalname;
  params.Body = req.file.buffer;
  params.ACL = "public-read";

  if (req.body.req_type == "blister") {
    

    s3Client.upload(params, async (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Error -> " + err });
      }

      if (data) {
        let imgURL = data.Location;

        await axios
          .post(
            process.env.FLASKBACKEND + `/predict/tea-disease-blister-blight`,
            {
              url: data.Location,
            }
          )
          .then(async (flaskRes) => {
            console.log("==========Flask Response is============");
            console.log(flaskRes);
            console.log("====================================");
            // update obj

            if (flaskRes.data.class != "healthy") {
              await axios
                .post(
                  process.env.FLASKBACKEND +
                    `/predict/tea-disease-damage-percentage`,
                  {
                    url: imgURL,
                  }
                )
                .then(async (percentageRes) => {
                  const newDetection = new BlisterModel({
                    user_Id,
                    lang,
                    long,
                    imgURL,
                    label: flaskRes.data.class,
                    score: flaskRes.data.probability,
                    ratio: percentageRes.data.Percentage,
                  });

                  await newDetection
                    .save()
                    .then((savedObj) => {
                      return res.status(200).json({ data: savedObj });
                    })
                    .catch((err) => {
                      console.log(err);
                      return res.status(400).json("Erro " + err);
                    });
                });
            } else {
              const newDetection = new BlisterModel({
                user_Id,
                lang,
                long,
                imgURL,
                label: flaskRes.data.class,
                score: flaskRes.data.probability,
              });

              await newDetection
                .save()
                .then((savedObj) => {
                  return res.status(200).json({ data: savedObj });
                })
                .catch((err) => {
                  console.log(err);
                  return res.status(400).json("Erro " + err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).json("Erro " + err);
          });
      }
    });
  } else if (req.body.req_type == "stem") {
    s3Client.upload(params, async (err, data) => {
      if (err) {
        console.log(err);
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        return res.status(500).json({ error: "Error -> " + err });
      }

      if (data) {
        let imgURL = data.Location;

        //  add
        //

        //
        await axios
          .post(
            process.env.FLASKBACKEND + `/predict/tea-disease-stem-canncer`,
            {
              url: data.Location,
            }
          )
          .then(async (flaskRes) => {
            console.log("==========Flask Response is============");
            console.log(flaskRes);
            console.log("====================================");
            // update obj

            if (flaskRes.data.class != "healthy") {
              await axios
                .post(
                  process.env.FLASKBACKEND +
                    `/predict/tea-disease-damage-percentage`,
                  {
                    url: imgURL,
                  }
                )
                .then(async (percentageRes) => {
                  const newDetection = new StemModel({
                    user_Id,
                    lang,
                    long,
                    imgURL,
                    label: flaskRes.data.class,
                    score: flaskRes.data.probability,
                    ratio: percentageRes.data.Percentage,
                  });

                  await newDetection
                    .save()
                    .then((savedObj) => {
                      return res.status(200).json({ data: savedObj });
                    })
                    .catch((err) => {
                      console.log(err);
                      return res.status(400).json("Erro " + err);
                    });
                });
            } else {
              const newDetection = new StemModel({
                user_Id,
                lang,
                long,
                imgURL,
                label: flaskRes.data.class,
                score: flaskRes.data.probability,
              });

              await newDetection
                .save()
                .then((savedObj) => {
                  return res.status(200).json({ data: savedObj });
                })
                .catch((err) => {
                  console.log(err);
                  return res.status(400).json("Erro " + err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).json("Erro " + err);
          });
      }
    });
  } else if (req.body.req_type == "insect") {
    s3Client.upload(params, async (err, data) => {
      if (err) {
        console.log(err);
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        return res.status(500).json({ error: "Error -> " + err });
      }

      if (data) {
        let audioURL = data.Location;

        //  add
        //

        //
        await axios
          .post(process.env.FLASKBACKEND + `/predict/tea-insect-detection`, {
            url: data.Location,
          })
          .then(async (flaskRes) => {
            console.log("==========Flask Response is============");
            console.log(flaskRes);
            console.log("====================================");
            // update obj

            const newDetection = new InsectModel({
              user_Id,
              lang,
              long,
              audioURL,
              status: flaskRes.data.Insect_detected,
              count: flaskRes.data.Insect_count,
            });

            await newDetection
              .save()
              .then((savedObj) => {
                return res.status(200).json({ data: savedObj });
              })
              .catch((err) => {
                console.log(err);
                return res.status(400).json("Erro " + err);
              });
          })
          .catch((err) => {
            console.log(err);
            return res.status(400).json("Erro " + err);
          });
      }
    });
  } else {
    s3Client.upload(params, async (err, data) => {
      if (err) {
        console.log(err);
        console.log("====================================");
        console.log(data);
        console.log("====================================");
        return res.status(500).json({ error: "Error -> " + err });
      }

      if (data) {
        let imgURL = data.Location;

        return res.status(200).json({ image: imgURL });
      }
    });
  }
};
