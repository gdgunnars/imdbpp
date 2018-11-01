import express from "express";
import cors from "cors";
import trendingRoute from "./routes/trending.route";
import tvShowRoute from "./routes/tvShow.route";
import movieRoute from "./routes/movie.route";
const app = express();
const port = 3000;

app.use(cors());
app.use("/trending", trendingRoute);
app.use("/tvshow", tvShowRoute);
app.use("/movie", movieRoute);

app.get("/", function(req, res) {
  res.send("API up and running...");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
