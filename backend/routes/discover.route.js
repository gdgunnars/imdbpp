import express from "express";
import axios from "axios";
import * as config from "../config.js";
import populateMedia from "../common/populateMedia";

const router = express.Router();
router.route("/").get(async (req, res) => {
  try {
    console.time("bingo");
    const discoverDataLink = `${config.getBasePath()}/discover/tv/?api_key=${config.getApiKey()}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1`;
    const { data } = await axios.get(discoverDataLink);
    const { results } = data;

    res.json(populateMedia(results).filter(item => item.backdropPath));
  } catch (error) {
    console.log(error);
    res.json({ message: "SHIT FAILED" });
  }
});

module.exports = router;
