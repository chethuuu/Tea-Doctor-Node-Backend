const AWS = require("aws-sdk");
// const env = require("./s3.env.js");
require("dotenv").config();

const s3Client = new AWS.S3({
  accessKeyId: "AKIAZWRDPMGC4C35DDAR",
  secretAccessKey: "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",
  region: "us-east-1",
});

const uploadParams = {
  Bucket: "awsvermentorrii",
  Key: "", // pass key
  Body: null, // pass file body
};

const s3 = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;

module.exports = s3;
