import express, { Router } from "express";
import { generateUploadURL } from "./../helpers/aws-s3-url.js";

const utilRouter = express.Router();

utilRouter.route("/s3Url").get(async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
});

export default utilRouter;
