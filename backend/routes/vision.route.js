import express from "express";
import * as ptt from 'parse-torrent-title';
import axios from "axios";
import * as config from "../config.js";
import dominantColor from '../dominantColor';
import populateMedia from '../common/populateMedia';


/**
 * assignment5lock þarf að vera í path. Name=GOOGLE_APPLICATION_CREDENTIALS  path=fullpath
 * það er boðið upp á api keys en þarf að skoða það betur. 
 * https://cloud.google.com/docs/authentication/getting-started#auth-cloud-implicit-nodejs
 * https://cloud.google.com/nodejs/docs/reference/vision/0.22.x/v1.ImageAnnotatorClient#imageProperties
 * 
 * Use an online image to base64 encoder and make sure that the string does not have image/bas64 string 
 * before the string. POST to localhost:3000/vision with content-type: application/json and the bosy
 * { image: <actual base64 string> }
 */

var fs = require('fs');
const vision = require('@google-cloud/vision');
const testFile = 'assets/morgan.jpg';

const visionObject = (bestGuess = {}, topEntities, logoAnnotations) => {
  const bestGuessInfo = ptt.parse(bestGuess.label);
  const logo = (logoAnnotations.length > 0 ? logoAnnotations[0].description : '').replace(/\([0-9]{4}\)$/, '').trim();
  return {
    bestGuess: logo ? logo : (bestGuessInfo.title.toLowerCase().includes(topEntities[0].description.toLowerCase()) ? topEntities[0].description : bestGuessInfo.title),
    googleGuess: bestGuess.label,
    topEntities: topEntities.map(({ score = 0, description = '' }) => {
      const info = ptt.parse(description);
      return { score, description: info.title || description };
    }),
    logo,
  }
}

const router = express.Router();
router.route("/").post(async (req, res) => {
  try {
    const client = new vision.ImageAnnotatorClient();
    const { image: base64str } = req.body;
    const image = base64str.replace(/(\r\n|\n|\r)/gm,"");
    const request = {
      image: { content:  image },
      features: [
        {
          type: "WEB_DETECTION",
        },
        {
          type: "LOGO_DETECTION",
        },
      ],
    };

    const imageData = await client.annotateImage(request);
    const { webDetection, logoAnnotations } = imageData[0];
    const obj = visionObject(webDetection.bestGuessLabels[0], webDetection.webEntities.splice(0, 3), logoAnnotations.splice(0, 1))

    searchResult(obj.bestGuess, res);
  } catch (error) {
    console.error('/vision -> Got an error processing vision endpoint:', error);
    return res.status(500).json({ message: "Got an error processing vision endpoint" });
  }
});

const base64_encode = (image) => {
  return new Promise((resolve, reject) => {
    try {
      // read binary data
      var bitmap = fs.readFileSync(image);
      // Performs label detection on the image file
      const encoded = Buffer.from(bitmap).toString('base64')
      encoded ? resolve(encoded) : reject('Error, file was not found or encoding failed');
    } catch (error) {
      console.error('Error converting image to base64:', error);
      reject('Error, file was not found or encoding failed');
    }
  });
}

const searchResult = async (query, res) => {
  try {
    console.time("Fetching data");
    const searchQuery = encodeURI(query);
    const queryResults = await axios.get(
      `${config.getBasePath()}/search/multi?api_key=${config.getApiKey()}&language=en-US&query=${searchQuery}&page=1&include_adult=false}`
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
      tv: { popularity: -1, data: [] },
      query
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
}

module.exports = router;
