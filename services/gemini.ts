import { GoogleGenerativeAI } from "@google/generative-ai";
import { Question } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    throw new Error('VITE_GEMINI_API_KEY must be provided in environment variables.');
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
        responseMimeType: "application/json",
    }
});

const extractQuestionsFromFile = async (fileContent: string): Promise<Omit<Question, 'id' | 'isPublic' | 'createdAt' | 'authorId'>[]> => {
    try {
        const prompt = `Extract questions and answers from the following text. For each question, provide the question content, a concise answer, up to 3 relevant tags, a difficulty level (easy, medium, or hard), and a general topic. Format the output as a JSON array of objects. Here is the text: \n\n${fileContent}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const jsonString = response.text();
        const parsedData = JSON.parse(jsonString);
        
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