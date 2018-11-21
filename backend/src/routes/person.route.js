import express from "express";
import axios from "axios";
import * as config from "../config.js";
import setImagePath from "../common/setImagePath";
import populateMedia from "../common/populateMedia";

const router = express.Router();
router.route("/:personId").get(async (req, res) => {
  const { personId } = req.params;
  if (!personId) {
    res.status(412).json({ message: "Missing personId" });
  }
  try {
    console.time("axios");
    const personDetails = await axios
      .get(
        `${config.getBasePath()}/person/${personId}?api_key=${config.getApiKey()}&language=en-US&append_to_response=combined_credits`
      )
      .then(response => response.data);

    const populated = setImagePath(populateMedia(personDetails));
    res.json(populated);
  } catch (error) {
    console.log('Error in person endpoint', error);
    return res.status(500).json({ message: "Got an error" });
  }
});

export default router;
