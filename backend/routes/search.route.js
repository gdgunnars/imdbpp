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
    res.status(400).json({ message: "Missing search query" });
  }
  try {
    const searchQuery = encodeURI(query);
    const queryResults = await axios.get(
      `${config.getBasePath()}/search/multi?api_key=${config.getApiKey()}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false}`
    );

    const data = queryResults.data.results.reduce((acc, curr) => {
      const searchObject = {
        id: curr.id,
        displayName: curr.title ? curr.title : curr.name,
        type: curr.media_type,
        image: setImagePath(
          curr.poster_path ? curr.poster_path : curr.profile_path
        ),
        knownFor: curr.known_for ? curr.known_for : [],
        popularity: curr.popularity
      };
      acc.push(searchObject);
      return acc;
    }, []);

    const sortedByPopularity = data.sort((a, b) => (a.popularity >= b.popularity) ? -1 : 1);

    res.status(200).json(sortedByPopularity);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred" });
  }
});

export default router;
