import ColorThief from "color-thief-jimp";
import Jimp from "jimp";

const dominantColor = path =>
  new Promise((resolve, reject) => {
    Jimp.read(path, (err, sourceImage) => {
      if (err) {
        return reject(err);
      }
      return resolve(ColorThief.getColor(sourceImage));
    });
  });

export default dominantColor;
