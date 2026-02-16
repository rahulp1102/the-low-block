import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message, AnalysisMode } from '../types';

// Initialize the API client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

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

export const fetchAIResponse = async (history: Message[], mode: AnalysisMode): Promise<string> => {
  try {
    // FIX: Reverting to 'gemini-2.5-pro' 
    // This is the most stable model for the Free Tier.
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-pro", 
      tools: [{ googleSearch: {} }] 
    });

    // Dynamic Date Injection
    const today = new Date().toLocaleDateString('en-GB', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const contextPrompt = `
      ${PERSONAS[mode]}
      
      CRITICAL CONTEXT:
      - Today's Date: ${today}.
      - Current Season: 2025/2026.
      - If asking for stats/form, YOU MUST USE THE GOOGLE SEARCH TOOL to find live data from the 25/26 season.
      - Do not rely on your internal training data for recent matches.
    `;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: contextPrompt }],
        },
        {
          role: "model",
          parts: [{ text: `System online. Date: ${today}. Search tools active.` }],
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
    if (error.message.includes("429")) {
       return "⚠️ TRAFFIC OVERLOAD: Please wait 1 minute before your next question.";
    }
    return `SYSTEM ERROR: ${error.message || "Unknown error occurred"}`;
  }
};
