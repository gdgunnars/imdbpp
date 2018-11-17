import "./env";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import polyfill from "@babel/polyfill";
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import rfs from 'rotating-file-stream';
import trendingRoute from "./routes/trending.route";
import tvShowRoute from "./routes/tvShow.route";
import searchRoute from "./routes/search.route";
import movieRoute from "./routes/movie.route";
import topRatedMoviesRoute from "./routes/topRatedMovies.route";
import topRatedTvRoute from "./routes/topRatedTv.route";
import moviesByGenreRoute from "./routes/moviesByGenre.route";
import tvByGenreRoute from "./routes/tvByGenre.route";
import vision from "./routes/vision.route";
import personRoute from "./routes/person.route";
import discoverRoute from "./routes/discover.route";

const app = express();
const port = 3000;

// Enable Cross origin.
app.use(cors());
// Add body parsing and upp the body size limit.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "15mb" }));
// Add logging both to console and file.
const logDirectory = path.join(__dirname, 'log')
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// create a rotating write stream
const accessLogStream = rfs('access.log', {
  interval: '7d', // rotate weekly
  path: logDirectory
});
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));
// And log to console.
app.use(morgan('dev'));

app.use("/trending", trendingRoute);
app.use("/tvshow", tvShowRoute);
app.use("/movie", movieRoute);
app.use("/person", personRoute);
app.use("/topratedmovies", topRatedMoviesRoute);
app.use("/topratedtv", topRatedTvRoute);
app.use("/moviesgenre", moviesByGenreRoute);
app.use("/tvgenre", tvByGenreRoute);
app.use("/vision", vision);
app.use("/discover", discoverRoute);
app.use("/search", searchRoute);

app.get("/", function(req, res) {
  res.send("API up and running...");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
