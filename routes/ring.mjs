import { Router } from "express";
import { RingsHead } from "../constants/index.mjs";

const router = Router();

router.get("/ring", (req, res) => {
  // res.send(blogsData);
  res.send(RingsHead);
});

export default router;