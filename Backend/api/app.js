//importing express for creating REST apis
import express from "express";
// importing mongoose for connecting with mongodb
import mongoose from "mongoose";
// importing cors for allowing cross origin requests
import cors from "cors";
// importing router file
import routes from "./routes/index.js";
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(
  cors({
    origin: "http://localhost:3005",
    credentials:true
  })
);


app.use(cookieParser());
//connecting mongoDB with mongoose
mongoose.connect(
  "mongodb+srv://jayakumarva:xKw9I5gZ4LG3cGQd@cluster0.zqpinsh.mongodb.net/MealTrainDB?retryWrites=true&w=majority"
);

// mongoose.connect("mongodb://localhost:27017/MealTrainDB");
// initialing routes
routes(app);
export default app;
