import express from "express";
import axios from "axios";
import * as config from "../config.js";

// Todo: Remove this in production, we use static data so we dont get blocked by tmdb.org api by issuing to many requests.
var staticData = [];

const addTrailer = async (id, type) => {
  const trailerLink = `${config.getBasePath()}/${type}/${id}/videos?api_key=${config.getApiKey()}`;
  const { data } = await axios.get(trailerLink);
  const { results } = data;
  return config.getTrailerLink(results[0].key);
};

const router = express.Router();
router.route("/").get(async (req, res) => {
  if (staticData.length > 0) {
    return res.json(staticData);
  }
  try {
    console.time("bingo");
    const width = 500;
    // get All trending data
    const trendingDataLink = `${config.getBasePath()}/trending/all/day?api_key=${config.getApiKey()}`;
    const { data } = await axios.get(trendingDataLink);
    const { results } = data;

    const mappedResults = await results.map(
      async ({
        id,
        name,
        title,
        original_name,
        original_title,
        vote_average,
        poster_path,
        backdrop_path,
        genre_ids,
        overview,
        release_date,
        first_air_date
      }) => {
        const type = `${first_air_date ? "tv" : "movie"}`;
        const trailer = await addTrailer(id, type);
        const elem = {
          id,
          name: name || original_name || title || original_title,
          score: vote_average,
          poster_path: config.getImageLink(width, poster_path),
          backdrop_path: config.getImageLink(width, backdrop_path),
          genre_ids,
          overview,
          date: first_air_date || release_date,
          type,
          trailer
        };
        return elem;
      }
    );

    const finalRes = await Promise.all(mappedResults);
    staticData = finalRes;

    console.timeEnd("bingo");
    res.json(finalRes);
  } catch (error) {
    console.log(error);
    res.json({ message: "SHIT FAILED" });
  }
});

module.exports = router;
