import { Router } from "express";
import * as search from "../controllers/search.controller.js";

const router = Router();

router
  .get("/person/:query", search.searchPerson)
  .get("/movies/:query", search.searchMovie)
  .get("/tv/:query", search.searchTv)
  .get("/history", search.getSearchHistory)
  .delete("/history/:id", search.removeItemFromSearchHistory);

export default router;
