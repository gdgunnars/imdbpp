import "./env";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
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

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '15mb'}));
app.use("/trending", trendingRoute);
app.use("/tvshow", tvShowRoute);
app.use("/movie", movieRoute);
app.use("/person", personRoute);
app.use("/search", searchRoute);
app.use("/topratedmovies", topRatedMoviesRoute);
app.use("/topratedtv", topRatedTvRoute);
app.use("/moviesgenre", moviesByGenreRoute);
app.use("/tvgenre", tvByGenreRoute);
app.use("/vision", vision);

app.get("/", function(req, res) {
  res.send("API up and running...");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
