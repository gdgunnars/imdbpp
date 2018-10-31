import express from "express";
import axios from "axios";
import * as config from "../config.js";

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
    console.time("test");
    const getDetails = axios.get(
      `${config.getBasePath()}/tv/${tvId}?api_key=${config.getApiKey()}`
    );
    const getCredits = axios.get(
      `${config.getBasePath()}/tv/${tvId}/credits?api_key=${config.getApiKey()}&language=en-US`
    );
    const getSimilar = axios.get(
      `${config.getBasePath()}/tv/${tvId}/similar?api_key=${config.getApiKey()}&language=en-US&page=1`
    );
    const allData = await Promise.all([getDetails, getCredits, getSimilar]);
    console.timeEnd("test");
    const mappedData = allData.map(item => item.data);
    // Todo: parse data and take what i need.
    res.json({ message: "I got something" });
  } catch (error) {
    console.log(error);
    res.json({ message: "I got err" });
  }
});

export default router;
