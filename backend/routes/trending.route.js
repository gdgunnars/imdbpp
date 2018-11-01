import express from "express";
import axios from "axios";
import * as config from "../config.js";
import populateMedia from "../common/populateMedia";

// Todo: Remove this in production, we use static data so we dont get blocked by tmdb.org api by issuing to many requests.
var staticData = [];

const router = express.Router();
router.route("/").get(async (req, res) => {
  if (staticData.length > 0) {
    return res.json(staticData);
  }
  try {
    console.time("bingo");
    const trendingDataLink = `${config.getBasePath()}/trending/all/day?api_key=${config.getApiKey()}`;
    const { data } = await axios.get(trendingDataLink);
    const { results } = data;
    res.json(populateMedia(results));
  } catch (error) {
    console.log(error);
    res.json({ message: "SHIT FAILED" });
  }
});

module.exports = router;
