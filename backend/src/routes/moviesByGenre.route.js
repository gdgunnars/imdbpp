import express from "express";
import axios from "axios";
import * as config from "../config.js";
import populateMedia from "../common/populateMedia";
import genres from "../common/genres";

const router = express.Router();
router.route("/").get(async (req, res) => {
  const { genre } = req.query;

  try {
    const trendingDataLink = `${config.getBasePath()}/discover/movie/?api_key=${config.getApiKey()}&with_genres=${genre}`;
    const { data } = await axios.get(trendingDataLink);
    const { results } = data;
    const populated = populateMedia(results);
    res.json({ title: genres.movie[genre].name, data: populated });
  } catch (error) {
    console.log('Error in movies by genre', error);
    res.json({ message: "SHIT FAILED" });
  }
});

module.exports = router;
