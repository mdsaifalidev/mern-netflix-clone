import asyncHandler from "express-async-handler";
import ApiResponse from "../utils/ApiResponse.js";
import fetchFromTMDB from "../utils/tmdb.js";

/**
 * @function getTrendingTv
 * @description Fetch trending TV shows
 * @route GET /api/v1/tv/trending
 * @access Public
 */
const getTrendingTv = asyncHandler(async (req, res) => {
  const data = await fetchFromTMDB(
    "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
  );
  const radomTv =
    data.results[Math.floor(Math.random() * data.results?.length)];

  res
    .status(200)
    .json(new ApiResponse("Trending TV show fetched successfully.", radomTv));
});

/**
 * @function getTvTrailers
 * @description Fetch TV show trailers
 * @route GET /api/v1/tv/:id/trailers
 * @access Public
 */
const getTvTrailers = asyncHandler(async (req, res) => {
  try {
    const id = req.params?.id;

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res
      .status(200)
      .json(
        new ApiResponse("TV show trailers fetched successfully.", data.results)
      );
  } catch (error) {
    if (error.response?.status === 404) {
      res
        .status(404)
        .json(new ApiResponse("TV show trailers fetched successfully.", []));
    } else {
      throw error;
    }
  }
});

/**
 * @function getTvDetails
 * @description Fetch TV show details
 * @route GET /api/v1/tv/:id/details
 * @access Public
 */
const getTvDetails = asyncHandler(async (req, res) => {
  try {
    const id = req.params?.id;

    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    res
      .status(200)
      .json(
        new ApiResponse("TV show details fetched successfully.", data.results)
      );
  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json(new ApiResponse("TV show details not found.", []));
    } else {
      throw error;
    }
  }
});

/**
 * @function getSimilarTvs
 * @description Fetch similar TV shows
 * @route GET /api/v1/tv/:id/similar
 * @access Public
 */
const getSimilarTvs = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  const data = await fetchFromTMDB(
    `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
  );
  res
    .status(200)
    .json(
      new ApiResponse("Similar TV shows fetched successfully.", data.results)
    );
});

/**
 * @function getTvsByCategory
 * @description Fetch TV shows by category
 * @route GET /api/v1/tv/:category
 * @access Public
 */
const getTvsByCategory = asyncHandler(async (req, res) => {
  const category = req.params?.category;
  const data = await fetchFromTMDB(
    `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
  );
  res
    .status(200)
    .json(new ApiResponse("TV shows fetched successfully.", data.results));
});

export {
  getTrendingTv,
  getTvTrailers,
  getTvDetails,
  getSimilarTvs,
  getTvsByCategory,
};
