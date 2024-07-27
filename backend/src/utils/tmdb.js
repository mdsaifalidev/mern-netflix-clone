import axios from "axios";
import ApiError from "./ApiError.js";

/**
 * @function fetchFromTmdb
 * @description Fetch data from the TMDB API
 */
const fetchFromTMDB = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  const response = await axios.get(url, options);
  return response.data;
};

export default fetchFromTMDB;
