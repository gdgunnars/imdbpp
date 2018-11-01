import express from "express";
import axios from "axios";
import * as config from "../config.js";
import setImagePath from "../common/setImagePath";
import populateMedia from "../common/populateMedia";
// Postman request localhost:3000/search/{"actor":"Tom Hanks", "movie":"Titanic"}

const router = express.Router();
/**
 * params (query): query
 */
router.route("/").get(async (req, res) => {
  console.log("In search");

  const { query } = req.query;
  if (!query) {
    res.status(400).json({ message: "Missing search query" });
  }
  try {
    console.time("axios");

    const searchQuery = encodeURI(query);
    const queryResults = await axios.get(
      `${config.getBasePath()}/search/multi?api_key=${config.getApiKey()}&language=en-US&query=${searchQuery}&page=1&include_adult=false}`
    );

    console.timeEnd("axios"); // takes about 1916.7 s to fetch all this data.

    res.status(200).json({
      message: "Got something",
      data: queryResults.data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred" });
  }
});

export default router;
