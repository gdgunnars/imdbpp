import * as config from "../config";
import axios from "axios";

const getTrailer = async (id, type) => {
  const trailerLink = `${config.getBasePath()}/${type}/${id}/videos?api_key=${config.getApiKey()}`;
  const { data } = await axios.get(trailerLink);
  const { results } = data;
  if (results.length > 0) {
    const res = await axios(config.getYouTubeInfoPath(results[0].key));
    const info = res.data;
    const r = /\\u([\d\w]{4})/gi;
    const decoded = decodeURIComponent(info);
    const split = decoded.split(",");
    let url = split.find(
      item => item.startsWith('"url') && item.includes("mp4")
    );
    url = decodeURIComponent(url);
    url = url.replace(r, (match, grp) =>
      String.fromCharCode(parseInt(grp, 16))
    );
    const final = unescape(url).slice(7, -1);
    return final.toString().trim();
  }
  return "";
};

export default getTrailer;
