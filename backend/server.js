import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import cors from "cors";
import routes from "./routes/routes";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
const mongoURI =
    `${process.env.DB_URI}/${process.env.DB_NAME}` ||
    "mongodb://localhost/portfolio";

/* BODY PARSER */
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

/* CORS */
app.use(cors());

/* MONGOOSE */
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).catch((err) => handleError(err));
mongoose.connection.on("error", (err) => {
    logError(err);
});

/* ROUTES */
app.get("/", (req, res) => res.send(`running on ${PORT}`));
routes(app);

/* SERVER */
app.listen(PORT, () => console.info(`server running on ${PORT}`));
