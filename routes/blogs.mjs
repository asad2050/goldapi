import { Router } from "express";
import { shopByEmotion } from "../constants/index.mjs";

const router = Router();

router.get("/blogs", (req, res) => {
  // res.send(blogsData);
  res.send(shopByEmotion);
});

export default router;
