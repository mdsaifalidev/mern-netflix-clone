import User from "../models/user.model.js";
import asyncHandler from "express-async-handler";
import ApiResponse from "../utils/ApiResponse.js";
import fetchFromTMDB from "../utils/tmdb.js";

/**
 * @function search
 * @description Search for a movie, tv show or person
 * @param {String} type - The type of search
 * @param {String} query - The search query
 * @returns {Array} - The search results
 */
const search = async (type, query, id) => {
  const urlMap = {
    person: `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`,
    movie: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    tv: `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`,
  };

  const data = await fetchFromTMDB(urlMap[type]);
  if (data.results.length === 0) {
    throw new ApiResponse(
      `${type.charAt(0).toUpperCase() + type.slice(1)} not found.`,
      []
    );
  }

  const result = data.results[0];
  await User.findByIdAndUpdate(id, {
    $push: {
      searchHistory: {
        id: result.id,
        image: type === "person" ? result.profile_path : result.poster_path,
        title: type === "person" ? result.name : result.title,
        searchType: type,
        createdAt: Date.now(),
      },
    },
  });

  return data.results;
};

/**
 * @function searchHandler
 * @description Search for a movie, tv show or person
 * @route GET /api/v1/search?type=movie|tv|person&query=query
 * @access Public
 */
const searchHandler = (type) =>
  asyncHandler(async (req, res) => {
    try {
      const query = req.params?.query;

      const result = await search(type, query, req.user?._id);
      res
        .status(200)
        .json(new ApiResponse("Search results fetched successfully.", result));
    } catch (error) {
      if (error instanceof ApiResponse) {
        res.status(404).json(new ApiResponse(error.message, []));
      } else {
        throw error;
      }
    }
  });

/**
 * @function getSearchHistory
 * @description Get the search history of the user
 * @route GET /api/v1/search/history
 * @access Public
 */
const getSearchHistory = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(
      new ApiResponse(
        "Search history fetched successfully.",
        req.user.searchHistory
      )
    );
});

/**
 * @function remoteItemFromSearchHistory
 * @description Remove an item from the search history
 * @route DELETE /api/v1/search/history/:id
 * @access Public
 */
const removeItemFromSearchHistory = asyncHandler(async (req, res) => {
  const id = parseInt(req.params?.id);

  await User.findByIdAndUpdate(req.user._id, {
    $pull: {
      searchHistory: { id: id },
    },
  });

  res.status(200).json(new ApiResponse("Item removed from search history."));
});

const searchMovie = searchHandler("movie");
const searchTv = searchHandler("tv");
const searchPerson = searchHandler("person");

export {
  searchMovie,
  searchTv,
  searchPerson,
  getSearchHistory,
  removeItemFromSearchHistory,
};
