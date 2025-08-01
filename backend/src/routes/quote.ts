import { Hono } from "hono";
import fetch from "node-fetch";

export const quoteRouter = new Hono();

const fallbackQuote = {
  quote:
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  author: "Winston Churchill",
};

quoteRouter.get("/", async (c) => {
  try {
    const response = await fetch("https://quotes-api-self.vercel.app/quote");
    if (!response.ok) {
      return c.json(fallbackQuote);
    }
    let data;
    data = await response.json();
    if (!data || typeof data.quote !== "string") {
      return c.json(fallbackQuote);
    }
    return c.json(data);
  } catch (e) {
    console.error("Error fetching Quote:", e);
    return c.json(fallbackQuote);
  }
});
