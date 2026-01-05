import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  console.log("I'm a big bad boy");
  res.send("Snake game coming soon!!!!");
});

export default router;
