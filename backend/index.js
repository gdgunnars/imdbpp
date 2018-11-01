import express from "express";
import cors from "cors";
import trendingRoute from "./routes/trending.route";
import tvShowRoute from "./routes/tvShow.route";
import searchRoute from "./routes/search.route";
import movieRoute from "./routes/movie.route";
import topRatedMoviesRoute from './routes/topRatedMovies.route';
import topRatedTvRoute from './routes/topRatedTv.route';
import moviesByGenreRoute from './routes/moviesByGenre.route';
import tvByGenreRoute from './routes/tvByGenre.route';

const app = express();
const port = 3000;

app.use(cors());
app.use("/trending", trendingRoute);
app.use("/tvshow", tvShowRoute);
app.use("/movie", movieRoute);
app.use("/search", searchRoute);
app.use('/topratedmovies', topRatedMoviesRoute);
app.use('/topratedtv', topRatedTvRoute);
app.use('/movies', moviesByGenreRoute);
app.use('/tv', tvByGenreRoute);

app.get('/', function(req, res) {
  res.send('API up and running...');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
