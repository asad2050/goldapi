import { Router } from "express";
import GoldPrice from "../models/GoldPrice.mjs";
import { DateTime } from "luxon";
const router = Router();

// MongoDB integration to store gold api with 9am - 6pm and 6pm - 9am, preGSTFinalPrice
// Firebase can also be used in place of MongoDb to Store the GoldPrice
router.get("/gold-price", async (req, res) => {
  try {
    // Define the timezone offset for IST (+5:30)
    const IST = DateTime.local().setZone("Asia/Kolkata");

    // Get the current date and time in IST
    const now = IST;

    // Check if it's 9 AM or 6 PM
    const currentHour = now.hour;

    // Determine if we need to fetch the data (9 AM or 6 PM)
    let fetchNewData = false;

    // Fetch data if it's 9 AM or 6 PM
    if (currentHour === 9 || currentHour === 18) {
      fetchNewData = true;
    }
    // Calculate the start and end of today in IST (to fetch data for the current day)
    const startOfToday = now.startOf("day"); // Midnight of today in IST
    const endOfToday = now.endOf("day"); // End of today in IST

    // Convert times to UTC for the database comparison
    const startOfTodayUTC = startOfToday.toUTC();
    const endOfTodayUTC = endOfToday.toUTC();
    // console.log(startOfTodayUTC.toJSDate());
    // console.log(endOfTodayUTC.toJSDate());

    // // Check the database for existing data for today (either 9 AM or 6 PM)
    let goldPrice = await GoldPrice.findOne({
      date: {
        $gte: startOfTodayUTC.toJSDate(),
        $lt: endOfTodayUTC.toJSDate(),
      },
    });

    if (!goldPrice && fetchNewData) {
      // If no data exists for the current day and we need to fetch new data
      const response = await fetch("https://www.goldapi.io/api/XAU/INR", {
        method: "GET",
        headers: {
          "x-access-token": process.env.GOLD_API_KEY,
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      const cess = result.price * 0.06;
      const tds = result.price * 0.01;
      const goldFlutctuationInsurance = result.price * 0.03;
      const preGSTFinalPrice =
        result.price + cess + tds + goldFlutctuationInsurance;
      // Save the fetched data to MongoDB with the appropriate time (either 9 AM or 6 PM)
      const goldPriceData = new GoldPrice({
        ...result,
        date: now
          .set({ hour: currentHour, minute: 0, second: 0, millisecond: 0 })
          .toUTC()
          .toJSDate(),
        preGSTFinalPrice, // Set the date to 9 AM or 6 PM in UTC
      });

      await goldPriceData.save();

      console.log(
        `Fetched and saved new gold price data for ${
          currentHour === 9 ? "9 AM" : "6 PM"
        }.`
      );
    }

    if (goldPrice) {
      console.log("Using cached gold price data from MongoDB.");
    }

    // Send the appropriate gold price data (whether from database or fetched)
    res.json(
      goldPrice || { message: "No data available yet for today's fetch." }
    );
  } catch (error) {
    console.error("Error fetching or retrieving gold price data:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
