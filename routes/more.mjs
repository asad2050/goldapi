import { Router } from "express";
import { more } from "../constants/index.mjs";

const router = Router();

router.get("/more", (req, res) => {
  // res.send(blogsData);
  res.send(more);
});

export default router;