import express from "express";
import axios from "axios";
import * as config from "../config.js";
import setImagePath from "../common/setImagePath";
import populateMedia from "../common/populateMedia";
// Postman request localhost:3000/search/{"actor":"Tom Hanks", "movie":"Titanic"}

const router = express.Router();
/**
 *  /search?query='some data'&page=1
 * Query is mandatorybut page is optional, defaults to 1.
 */
router.route("/").get(async (req, res) => {
  console.log("In search");

  const { query, page = 1 } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Missing search query" });
  }
  try {
    const searchQuery = encodeURI(query);
    const queryResults = await axios.get(
      `${config.getBasePath()}/search/multi?api_key=${config.getApiKey()}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false}`
    );

    const sortedByPopularity = queryResults.data.results.sort((a, b) => (a.popularity >= b.popularity) ? -1 : 1);
    const data = populateMedia(sortedByPopularity);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred" });
  }
});

export default router;
