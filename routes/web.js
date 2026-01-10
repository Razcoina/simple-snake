import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { getScores, postScore } from "../controllers/scores.js";

const router = Router();

// Limit the number of connections per client in a time interval
const limiter = rateLimit({
  windowMs: 5000,
  limit: 1,
  message: "Too many requests, slow down!",
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

// This is one is unnecessary, express does this one automatically
// but it's still here for clarity
router.get("/", (req, res) => {
  res.sendFile("index.html", { root: "public" });
});

router.get("/scores", getScores);
router.post("/scores", limiter, postScore);

export default router;
