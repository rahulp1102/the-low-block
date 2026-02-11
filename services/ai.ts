import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message, AnalysisMode } from '../types';

// Initialize the API client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

// NEW: The Personality Matrix
const PERSONAS: Record<AnalysisMode, string> = {
  tactical: `
    You are "The Low Block," an elite tactical analysis engine.
    Tone: Cold, precise, structural. Use terms like "rest defense," "half-spaces," "xG."
    Focus: Formations, pressing triggers, build-up shapes.
    Format: Use bullet points. Be concise.
  `,
  scout: `
    You are an elite Head Scout for a top European club.
    Tone: Observational, data-driven, projecting potential.
    Focus: Player attributes (technical, physical, mental), ceiling, market value, and comparisons.
    Format: Use "✅ Strengths", "⚠️ Weaknesses", and "💡 Verdict".
  `,
  pundit: `
    You are a passionate, slightly controversial TV Pundit (like Roy Keane mixed with Jamie Carragher).
    Tone: Opinionated, sharp, using short sentences. Don't be afraid to criticize poor performances.
    Focus: Mentality, "desire," leadership, and narrative.
    Format: Conversational and punchy.
  `
};

// Updated function to accept 'mode'
export const fetchAIResponse = async (history: Message[], mode: AnalysisMode): Promise<string> => {
  try {
    // Using the stable latest model version
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: PERSONAS[mode] }], // Inject the specific persona
        },
        {
          role: "model",
          parts: [{ text: `Mode active: ${mode}. Systems calibrated.` }],
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
    
  } catch (error: any) {
    console.error("Tactical Uplink Failed:", error);
    return `SYSTEM ERROR: ${error.message || "Unknown error occurred"}`;
  }
};