import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import cors from "cors";
import routes from "./routes/routes";
require("dotenv").config({
    path: "../.env"
});

const app = express();

/* ENV VARIABLES */
const PORT = process.env.PORT || 8080;
const devMongoURI =
    `${process.env.DB_URI}/${process.env.DB_NAME}` ||
    "mongodb://localhost/portfolio";
const mongoURI =
    process.env.ENV === "dev"
        ? devMongoURI
        : `${process.env.DB_URI}/${process.env.UN}:${process.env.PW}@${process.env.DB_HOST}:${process.env.DEFAULT_DB_PORT}`;

/* BODY PARSER */
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

/* CORS */
app.use(cors());

/* MONGOOSE */
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI).catch((err) => console.error(err));
mongoose.connection.on("error", (err) => {
    console.error(err.message);
});

/* ROUTES */
app.get("/", (req, res) => res.send(`running on ${PORT}`));
routes(app);

/* SERVER */
app.listen(PORT, () => console.info(`server running on ${PORT}`));
