import { Message } from '../types';

// In a real implementation, this would import GoogleGenAI
// import { GoogleGenAI } from "@google/genai";

/**
 * Simulates sending a message to the AI service.
 * This is where the Gemini API integration will eventually live.
 */
export const fetchAIResponse = async (history: Message[]): Promise<string> => {
  // const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  // const model = ai.models.getGenerativeModel({ model: "gemini-pro" }); 
  
  // Simulate network delay for "thinking" state
  await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

  // Placeholder logic: In the future, 'history' would be formatted and sent to Gemini.
  const lastUserMessage = history[history.length - 1]?.content.toLowerCase() || "";

  if (lastUserMessage.includes("tactic") || lastUserMessage.includes("formation")) {
    return "From a tactical perspective, switching to a 3-4-3 could offer better width against a low block. However, you expose the flanks if the wing-backs don't track back efficiently.";
  }
  
  if (lastUserMessage.includes("press") || lastUserMessage.includes("klopp")) {
    return "Gegenpressing requires high intensity. The key is the trigger—losing possession acts as the immediate signal to swarm the ball carrier before they can consolidate.";
  }

  return "I am currently in calibration mode. Once fully connected to the Gemini API, I will be able to provide deep tactical breakdowns, player comparisons, and historical match analysis based on the context you provide.";
};
