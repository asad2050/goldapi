import { Router } from "express";
import { Collections } from "../constants/index.mjs";

const router = Router();

router.get("/collection", (req, res) => {
  // res.send(blogsData);
  res.send(Collections);
});

export default router;