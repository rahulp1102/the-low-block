import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from '../types';

// Initialize the API client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// System Instruction: This defines the AI's persona
const SYSTEM_INSTRUCTION = `
You are "The Low Block," an elite football tactical analysis engine. 
Your tone is professional, analytical, and slightly detached, like a senior match analyst briefing a head coach.

Guidelines:
1. **Terminology**: Use precise tactical jargon (e.g., "half-spaces," "rest defense," "xG," "pressing triggers," "double pivot").
2. **Brevity**: Be concise. Avoid fluff. Focus on structure, shape, and movement.
3. **Format**: Use bullet points for key tactical breakdowns.
4. **Context**: If the user asks about a specific team (like Chelsea), analyze their current real-world tactical setup (e.g., Maresca's system).
5. **Restrictions**: Do not discuss non-football topics. If asked, reply: "Outside of tactical parameters."
`;

export const fetchAIResponse = async (history: Message[]): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Convert your chat history to the format Gemini expects
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        {
          role: "model",
          parts: [{ text: "System initialized. Tactical engine online. Awaiting data inputs." }],
        },
        ...history.slice(0, -1).map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        }))
      ],
    });

    const lastMessage = history[history.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = result.response;
    
    return response.text();
    
  } catch (error) {
    console.error("Tactical Uplink Failed:", error);
    return "Connection interrupted. Unable to retrieve tactical data at this time. (Check your API Key)";
  }
};