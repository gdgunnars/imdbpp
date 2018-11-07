import express from "express";
import axios from "axios";
import * as config from "../config.js";
import populateMedia from "../common/populateMedia";
import dominantColor from "../dominantColor";

const router = express.Router();
/**
 *  /search?query='some data'&page=1
 * Query is mandatorybut page is optional, defaults to 1.
 */
router.route("/").get(async (req, res) => {
  const { query, page = 1 } = req.query;
  if (!query) {
    return res.status(400).json({ message: "Missing search query" });
  }
  console.log(`In search - Query: ${query}`);
  try {
    console.time("Fetching data");
    const searchQuery = encodeURI(query);
    const queryResults = await axios.get(
      `${config.getBasePath()}/search/multi?api_key=${config.getApiKey()}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false}`
    );
    console.timeEnd("Fetching data");
    const sortedByPopularity = queryResults.data.results.sort(
      (a, b) => (a.popularity >= b.popularity ? -1 : 1)
    );
    const data = populateMedia(sortedByPopularity);
    let [mostPopular, ...rest] = data;
    if (!mostPopular || !mostPopular.posterPath) {
      console.log("im HERHEHR");
      return res.status(404).json({});
    }

    const [r = 14, g = 14, b = 14] = await dominantColor(
      mostPopular.posterPath
    );
    let responseObject = {
      topResult: {
        data: mostPopular,
        color: `rgb(${r},${g},${b})`
      },
      person: { popularity: -1, data: [] },
      movie: { popularity: -1, data: [] },
      tv: { popularity: -1, data: [] }
    };

    const filteredRest = rest.filter(item => item.posterPath !== null);

    for (let item of filteredRest) {
      const { popularity, type } = item;
      responseObject[type].data.push(item);
      if (responseObject[type].popularity < popularity) {
        responseObject[type].popularity = popularity;
      }
    }

    res.status(200).json(responseObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred" });
  }
});

export default router;
