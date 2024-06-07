import express from 'express';
import models from "./models/index.js";
import registerRoutes from "./routes/index.js";
import cors from "cors";
import mongoose from "mongoose";
import config from "config";
import jwtPrivateKey from "./config/custom-environment-variables.json" assert { type: "json" };
import "./config/default.json" assert { type: "json" };

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

registerRoutes(app);
/*
if (!config.has("jwtPrivateKey")) {
  console.log("Fatal error: jwtPrivateKey is not set.");
  process.exit(1);
}

*/

mongoose.connect(
  "mongodb://localhost:27017/timetomaster"
/*
  "mongodb+srv://timetomaster:timeToMaster123@cluster0.lt3xhc9.mongodb.net/timetomaster"
*/
  );

export default app;
