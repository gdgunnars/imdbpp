import express from "express";
import axios from "axios";
import * as config from "../config.js";
import populateMedia from "../common/populateMedia";

const router = express.Router();
router.route("/").get(async (req, res) => {
  try {
    console.time("bingo");
    const discoverDataLink = `${config.getBasePath()}/discover/tv/?api_key=${config.getApiKey()}&language=en-US&sort_by=popularity.desc&first_air_date_year=2018&page=1&include_null_first_air_dates=false`;
    const { data } = await axios.get(discoverDataLink);
    const { results } = data;

    res.json(populateMedia(results).filter(item => item.posterPath));
  } catch (error) {
    console.log(error);
    res.json({ message: "SHIT FAILED" });
  }
});

module.exports = router;
