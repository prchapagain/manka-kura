
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_API_MODEL_TEXT } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Daily prompts will be disabled. Please set process.env.API_KEY.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const getDailyPromptFromAPI = async (): Promise<string | null> => {
  if (!ai) {
    return null;
  }
  try {
    const promptContent = `Generate a short, thoughtful daily prompt for a social app named "Man Ka Kura" (Thoughts of the Heart/Mind) focused on emotional expression and personal reflection. 
    The prompt should encourage users to share their feelings, stories, or reflections. Keep it concise and open-ended. 
    Make it engaging and inspiring. Avoid complex philosophical questions.
    Examples: 
    - "What small joy brightened your day today?"
    - "A feeling I'm currently navigating is..."
    - "Describe a moment you felt truly understood."
    - "What are you grateful for right now, big or small?"
    - "If your heart could speak, what would it say today?"
    Return only the prompt text, without any prefixes like "Prompt:".`;

    const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_API_MODEL_TEXT,
        contents: promptContent,
    });
    
    const text = response.text.trim();
    // Remove any potential quotation marks Gemini might add around the prompt
    return text.replace(/^["'](.*)["']$/, '$1');
  } catch (error) {
    console.error("Error fetching daily prompt from Gemini API:", error);
    return null;
  }
};
