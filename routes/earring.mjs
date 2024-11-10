import { Router } from "express";
import { EaringHead } from "../constants/index.mjs";

const router = Router();

router.get("/earring", (req, res) => {
  // res.send(blogsData);
  res.send(EaringHead);
});

export default router;