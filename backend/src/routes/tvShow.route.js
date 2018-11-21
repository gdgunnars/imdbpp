import express from "express";
import axios from "axios";
import * as config from "../config.js";
import setImagePath from "../common/setImagePath";
import populateMedia from "../common/populateMedia";
import GetTrailer from "../common/getTrailer";

// Todo: Construct route for details:

// Get Details: https://api.themoviedb.org/3/tv/79242?api_key=c676ad1c06defe8fd668a42c4b030547&language=en-US

// Get Credits: https://api.themoviedb.org/3/tv/79242/credits?api_key=c676ad1c06defe8fd668a42c4b030547&language=en-US

// Get Similar Tv Shows: https://api.themoviedb.org/3/tv/79242/similar?api_key=c676ad1c06defe8fd668a42c4b030547&language=en-US&page=1

const router = express.Router();
router.route("/:tvId").get(async (req, res) => {
  const { tvId } = req.params;
  if (!tvId) {
    res.json({ message: "Missing tvId" });
  }
  try {
    console.time("axios");
    const getDetails = axios.get(
      `${config.getBasePath()}/tv/${tvId}?api_key=${config.getApiKey()}`
    );
    const getCredits = axios.get(
      `${config.getBasePath()}/tv/${tvId}/credits?api_key=${config.getApiKey()}&language=en-US`
    );
    const getSimilar = axios.get(
      `${config.getBasePath()}/tv/${tvId}/similar?api_key=${config.getApiKey()}&language=en-US&page=1`
    );

    const getTrailer = GetTrailer(tvId, "tv");

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

    const tvShoDetails = {
      ...details,
      type: "tv",
      ...credits,
      trailer,
      similar: similar.results
    };
    console.time("populate");
    const populated = setImagePath(populateMedia(tvShoDetails));
    console.timeEnd("populate");
    res.json(populated);
  } catch (error) {
    console.log('Error in tv show endpoint', error);
    res.json({ message: "I got err" });
  }
});

export default router;
