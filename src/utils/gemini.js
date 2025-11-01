// utils/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "./constants";

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash" // cheaper / more available in API free tier
});
