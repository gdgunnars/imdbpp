import express from "express";
import * as ptt from 'parse-torrent-title';


/**
 * assignment5lock þarf að vera í path. Name=GOOGLE_APPLICATION_CREDENTIALS  path=fullpath
 * það er boðið upp á api keys en þarf að skoða það betur. 
 * https://cloud.google.com/docs/authentication/getting-started#auth-cloud-implicit-nodejs
 * https://cloud.google.com/nodejs/docs/reference/vision/0.22.x/v1.ImageAnnotatorClient#imageProperties
 * Postman request localhost:3000/vision?query= ${`path to picture`}
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
router.route("/").get(async (req, res) => {

  try {
    const { query } = req.query;
    //const base64str = await base64_encode(query)
    console.log('In vision route');
    console.log(query);
    const client = new vision.ImageAnnotatorClient();

    const request = {
      image: { content: query },
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

    //res.json(obj);
    res.redirect(`../search?query=${obj.bestGuess}`);
  } catch (error) {
    console.error('/vision -> Got an error processing vision endpoint:', error);
    return res.status(500).json({ message: "Got an error processing vision endpoint" });
  }
});

// const base64_encode = (image) => {
//   return new Promise((resolve, reject) => {
//     try {
//       // read binary data
//       var bitmap = fs.readFileSync(image);
//       // Performs label detection on the image file
//       const encoded = Buffer.from(bitmap).toString('base64')
//       encoded ? resolve(encoded) : reject('Error, file was not found or encoding failed');
//     } catch (error) {
//       console.error('Error converting image to base64:', error);
//       reject('Error, file was not found or encoding failed');
//     }
//   });
// }

module.exports = router;
