import express from "express";
import { sendsms } from "../controllers/sms-controller.js";

const smsRouter = express.Router();

smsRouter.route("/").post(sendsms);

export default smsRouter;
