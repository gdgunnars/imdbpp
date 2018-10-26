import express from 'express';
import axios from 'axios';
import * as config from '../config.js';

const router = express.Router();
router
  .route('/')

  .get((req, res) => {
    axios
      .get(
        `${config.getBasePath()}/trending/movie/week?api_key=${config.getApiKey()}`
      )
      .then(response => {
        res.send(response.data);
      });
  });

module.exports = router;
