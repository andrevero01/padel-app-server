// const express = require("express");
// const aws = require("aws-sdk");
// const crypto = require("crypto");
// const { promisify } = require("util");

// const region = "eu-west-3";
// const bucketName = "padel-app-3";

// const s3 = new aws.S3({
//   region,
//   accessKeyId: process.env.ACCESS_KEY,
//   secretAccessKey: process.env.SECRET_KEY,
//   signatureVersion: "v4",
// });

// app.get("/generate-upload-url", async (req, res) => {
//   try {
//     const rawBytes = await promisify(crypto.randomBytes)(16);
//     const imageName = rawBytes.toString("hex");
//     const params = {
//       Bucket: bucketName,
//       Key: imageName,
//       Expires: 60,
//     };

//     const uploadURL = await s3.getSignedUrlPromise("putObject", params);
//     res.json({ uploadURL });
//   } catch (error) {
//     console.error("Error generating upload URL:", error);
//     res.status(500).json({ error: "Failed to generate upload URL" });
//   }
// });

// export async function generateUploadURL() {
//   const rawBytes = await randomBytes(16);
//   const imageName = rawBytes.toString("hex");
//   const params = {
//     Bucket: bucketName,
//     Key: imageName,
//     Expires: 60,
//   };

//   const uploadURL = await s3.getSignedUrlPromise("putObject", params);
//   return uploadURL;
// }
