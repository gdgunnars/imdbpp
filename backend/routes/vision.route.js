/**
 * assignment5lock þarf að vera í path. Name=GOOGLE_APPLICATION_CREDENTIALS  path=fullpath
 * það er boðið upp á api keys en þarf að skoða það betur. 
 * https://cloud.google.com/docs/authentication/getting-started#auth-cloud-implicit-nodejs
 * https://cloud.google.com/nodejs/docs/reference/vision/0.22.x/v1.ImageAnnotatorClient#imageProperties
 */
var fs = require('fs');
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();
var base64str = base64_encode('assets/forrest.jpg');
// Performs label detection on the image file
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    const encoded = Buffer.from(bitmap).toString('base64');
    return encoded;
}
const getImagedata = () => {

    client
        .textDetection({ image: { content: base64str } })
        .then(results => {
            const detections = results[0].textAnnotations;
            console.log('Text:');
            detections.forEach(text => console.log(text));
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}

module.exports = getImagedata;