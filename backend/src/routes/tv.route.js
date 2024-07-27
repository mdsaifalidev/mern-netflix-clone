import { Router } from "express";
import * as tv from "../controllers/tv.controller.js";

const router = Router();

router
  .get("/trending", tv.getTrendingTv)
  .get("/:id/trailers", tv.getTvTrailers)
  .get("/:id/details", tv.getTvDetails)
  .get("/:id/similar", tv.getSimilarTvs)
  .get("/:category", tv.getTvsByCategory);

export default router;
