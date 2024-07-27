import { Router } from "express";
import * as movie from "../controllers/movie.controller.js";

const router = Router();

router
  .get("/trending", movie.getTrendingMovie)
  .get("/:id/trailers", movie.getMovieTrailers)
  .get("/:id/details", movie.getMovieDetails)
  .get("/:id/similar", movie.getSimilarMovies)
  .get("/:category", movie.getMoviesByCategory);

export default router;
