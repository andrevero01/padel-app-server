const express = require("express");
const router = express.Router();
const aws = require("aws-sdk");
const crypto = require("crypto");
const { promisify } = require("util");

const region = "eu-west-3";
const bucketName = "padel-app-3";

const s3 = new aws.S3({
  region,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: "v4",
});

router.get("/url", async (req, res) => {
  try {
    const rawBytes = await promisify(crypto.randomBytes)(16);
    const imageName = rawBytes.toString("hex");
    const params = {
      Bucket: bucketName,
      Key: imageName,
      Expires: 60,
    };

    const uploadURL = await s3.getSignedUrlPromise("putObject", params);

    res.json({ uploadURL });
  } catch (error) {
    console.error("Error generating upload URL:", error.message);
    res.status(500).json({ error: "Failed to generate upload URL" });
  }
});

router.get("/images", async (req, res) => {
  const params = {
    Bucket: bucketName,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    const images = data.Contents.map((item) => {
      console.log(item);
      return item.Key;
    });
    res.json({ images });
  } catch (error) {
    console.error("Error listing images from S3:", error.message);
    res.status(500).json({ error: "Error listing images from S3" });
  }
});

router.get("/image/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const params = {
    Bucket: bucketName,
    Key: imageName,
  };

  s3.getObject(params)
    .createReadStream()
    .on("error", (err) => {
      console.error("Error fetching image from S3:", err);
      res.status(500).send("Error fetching image from S3");
    })
    .pipe(res);
});

module.exports = router;
