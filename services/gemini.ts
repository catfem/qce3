import { GoogleGenAI, Type } from "@google/genai";
import { Question } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const extractQuestionsFromFile = async (fileContent: string): Promise<Omit<Question, 'id' | 'isPublic' | 'createdAt' | 'authorId'>[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Extract questions and answers from the following text. For each question, provide the question content, a concise answer, up to 3 relevant tags, a difficulty level (easy, medium, or hard), and a general topic. Here is the text: \n\n${fileContent}`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            content: { type: Type.STRING },
                            answer: { type: Type.STRING },
                            tags: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            },
                            difficulty: {
                                type: Type.STRING,
                                enum: ['easy', 'medium', 'hard']
                            },
                            topic: { type: Type.STRING }
                        },
                        required: ['content', 'answer', 'tags', 'difficulty', 'topic']
                    },
                },
            },
        });

        const jsonString = response.text.trim();
        const parsedData = JSON.parse(jsonString);
        
        // Validate the structure
        if (Array.isArray(parsedData)) {
            return parsedData as Omit<Question, 'id' | 'isPublic' | 'createdAt' | 'authorId'>[];
        } else {
            throw new Error("Invalid data structure received from Gemini API.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to extract questions. The AI model might be unavailable or the content is invalid.");
    }
}

const geminiService = {
    extractQuestionsFromFile,
};

export default geminiService;