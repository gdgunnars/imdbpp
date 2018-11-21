import express from 'express';
import axios from 'axios';
import * as config from '../config.js';
import populateMedia from '../common/populateMedia';

// Todo: Remove this in production, we use static data so we dont get blocked by tmdb.org api by issuing to many requests.
var staticData = [];

const router = express.Router();
router.route('/').get(async (req, res) => {
  if (staticData.length > 0) {
    return res.json(staticData);
  }
  try {
    const trendingDataLink = `${config.getBasePath()}/movie/top_rated/?api_key=${config.getApiKey()}`;
    const { data } = await axios.get(trendingDataLink);
    const { results } = data;
    res.json(populateMedia(results.slice(1, 4))); // The top rated movie is for some reason some indian film so i skip that
  } catch (error) {
    console.log('Error in fetching top rated movies', error);
    res.json({ message: 'SHIT FAILED' });
  }
});

module.exports = router;
