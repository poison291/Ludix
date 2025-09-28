import arcjet, { shield, tokenBucket, detectBot } from "@arcjet/node";
import dotenv from "dotenv";

dotenv.config();

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    //protect server from sql injection
    shield({ mode: "LIVE" }),

    //block bots/automation
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    //Rate Limiting
    tokenBucket({
      mode: "LIVE",
      refillRate: 10, // 10 tokens added
      interval: 1000, // every second
      capacity: 50, // max 50 tokens
    }),
  ],
});
