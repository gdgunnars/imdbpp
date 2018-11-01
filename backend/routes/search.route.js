import express from "express";
import axios from "axios";
import * as config from "../config.js";
import setImagePath from "../common/setImagePath";
import populateMedia from "../common/populateMedia";
// Postman request localhost:3000/search/{"actor":"Tom Hanks", "movie":"Titanic"}

const router = express.Router();
router.route("/:searchParams").get(async (req, res) => {
    console.log('In search')

    const { actor = '', movie = '' } = JSON.parse(req.params.searchParams);
    const uriActor = encodeURI(actor);
    const uriMovie = encodeURI(movie);

    if (!actor && movie) {
        res.status(404).json({ message: "Missing searchParameter" });
    }
    try {
        console.time("axios");
        const getActors = axios.get(
            `${config.getBasePath()}/search/person?api_key=${config.getApiKey()}&language=en-US&query=${uriActor}&page=1&include_adult=false}`
        );

        const getMovies = axios.get(
            `${config.getBasePath()}/search/movie?api_key=${config.getApiKey()}&language=en-US&query=${uriMovie}&page=1&include_adult=false}`
        );

        const allData = await Promise.all([
            getActors,
            getMovies
        ]);

        console.timeEnd("axios"); // takes about 1916.7 s to fetch all this data.

        const [actor, movies] = allData.map(
            item => (item.data ? item.data : item)
        );

        const actorsData = {
            type: 'actors',
            ...actor,
            type: 'movies',
            ...movies

        }

        res.status(200).json({
            message: "Got something",
            actors: actorsData
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error occurred" })
    }
})

export default router;