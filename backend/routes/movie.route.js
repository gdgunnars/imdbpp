import express from "express";
import axios from "axios";
import * as config from "../config.js";
import setImagePath from "../common/setImagePath";
import populateMedia from "../common/populateMedia";
import GetTrailer from "../common/getTrailer";

const router = express.Router();
router.route("/:movieId").get(async (req, res) => {
  const { movieId } = req.params;
  if (!movieId) {
    res.json({ message: "Missing movieId" });
  }
  try {
    console.time("axios");
    const getDetails = axios.get(
      `${config.getBasePath()}/movie/${movieId}?api_key=${config.getApiKey()}&language=en-US`
    );
    const getCredits = axios.get(
      `${config.getBasePath()}/movie/${movieId}/credits?api_key=${config.getApiKey()}&language=en-US`
    );
    const getSimilar = axios.get(
      `${config.getBasePath()}/movie/${movieId}/similar?api_key=${config.getApiKey()}&language=en-US&page=1`
    );

    const getTrailer = GetTrailer(movieId, "movie");

    const allData = await Promise.all([
      getDetails,
      getCredits,
      getSimilar,
      getTrailer
    ]);
    console.timeEnd("axios"); // takes about 1.1sec to fetch all this data.

    const [details, credits, similar, trailer] = allData.map(
      item => (item.data ? item.data : item)
    );

    const movieDetails = {
      ...details,
      type: "movie",
      ...credits,
      trailer,
      similar: similar.results
    };
    console.time("populate");
    const populated = setImagePath(populateMedia(movieDetails));
    console.timeEnd("populate");
    res.json(populated);
  } catch (error) {
    console.log(error);
    res.json({ message: "I got err" });
  }
});

export default router;
