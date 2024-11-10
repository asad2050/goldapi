import { Router } from "express";
import { DigitalGold } from "../constants/index.mjs";

const router = Router();

router.get("/digitalgold", (req, res) => {
  // res.send(blogsData);
  res.send(DigitalGold);
});

export default router;