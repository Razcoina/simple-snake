import { Router } from "express";
import { getScores, postScore } from "../controllers/scores.js";

const router = Router();

// This is one is unnecessary, express does this one automatically
// but it's still here for clarity
router.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

router.get("/scores", getScores);
router.post("/scores", postScore);

export default router;
