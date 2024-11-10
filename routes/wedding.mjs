import { Router } from "express";
import { weddings } from "../constants/index.mjs";

const router = Router();

router.get("/wedding", (req, res) => {
  // res.send(blogsData);
  res.send(weddings);
});

export default router;