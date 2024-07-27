import asyncHandler from "express-async-handler";
import ApiResponse from "../utils/ApiResponse.js";
import fetchFromTMDB from "../utils/tmdb.js";

/**
 * @function getTrendingMovies
 * @description Fetch trending movies
 * @route GET /api/v1/movies/trending
 * @access Public
 */
const getTrendingMovie = asyncHandler(async (req, res) => {
  const data = await fetchFromTMDB(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
  );
  const randomMovie =
    data.results[Math.floor(Math.random() * data.results.length)];

  res
    .status(200)
    .json(new ApiResponse("Trending movie fetched successfully.", randomMovie));
});

/**
 * @function getMovieTrailers
 * @description Fetch popular movies
 * @route GET /api/v1/movies/:id/trailers
 * @access Public
 */
const getMovieTrailers = asyncHandler(async (req, res) => {
  try {
    const id = req.params?.id;

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res
      .status(200)
      .json(
        new ApiResponse("Movie trailers fetched successfully.", data.results)
      );
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json(new ApiResponse("Movie trailers not found.", []));
    } else {
      throw error;
    }
  }
});

/**
 * @function getMovieDetails
 * @description Fetch movie details
 * @route GET /api/v1/movies/:id/details
 * @access Public
 */
const getMovieDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.params?.id;

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res
      .status(200)
      .json(new ApiResponse("Movie details fetched successfully.", data));
  } catch (error) {
    if (error.response?.status === 404) {
      res
        .status(404)
        .json(new ApiResponse("Movie details fetched successfully.", []));
    } else {
      throw error;
    }
  }
});

/**
 * @function getSimilarMovies
 * @description Fetch similar movies
 * @route GET /api/v1/movies/:id/similar
 * @access Public
 */
const getSimilarMovies = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  const data = await fetchFromTMDB(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
  );
  res
    .status(200)
    .json(
      new ApiResponse("Similar movies fetched successfully.", data.results)
    );
});

/**
 * @function getMoviesByCategory
 * @description Fetch movies by category
 * @route GET /api/v1/movies/:category
 * @access Public
 */
const getMoviesByCategory = asyncHandler(async (req, res) => {
  const category = req.params?.category;

  const data = await fetchFromTMDB(
    `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
  );
  res
    .status(200)
    .json(new ApiResponse("Movies fetched successfully.", data.results));
});

export {
  getTrendingMovie,
  getMovieTrailers,
  getMovieDetails,
  getSimilarMovies,
  getMoviesByCategory,
};
