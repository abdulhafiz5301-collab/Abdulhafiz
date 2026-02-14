
import { GoogleGenAI } from "@google/genai";

// Fixed: Refactored continueStoryWithAI to initialize GoogleGenAI inside the function scope 
// and use process.env.API_KEY directly as per senior engineering guidelines.
export const continueStoryWithAI = async (title: string, currentContent: string): Promise<string> => {
  // Use process.env.API_KEY directly for initialization
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Siz mahoratli o'zbek yozuvchisiz. Quyidagi hikoyani mantiqiy va qiziqarli tarzda davom ettiring. 
    Faqat yangi qo'shilgan qismni qaytaring (hikoyaning o'zini qayta yozmang). 
    Til: O'zbek tili.
    
    Sarlavha: ${title}
    Mavjud matn: ${currentContent}
    
    Davomi:
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    // Property access .text is used directly (it is a getter, not a method)
    return response.text || "AI javob qaytara olmadi.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Hikoyani davom ettirishda xatolik yuz berdi.");
  }
};
