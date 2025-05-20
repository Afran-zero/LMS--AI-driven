const { GoogleGenerativeAI } = require('@google/generative-ai');

async function generateStudyMaterial(topic, courseType, difficultyLevel) {
  try {
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    
    // Get the generative model instance
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", // Updated to current recommended model
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

   const prompt = `You are an expert curriculum designer. Generate structured study material for the topic of "${topic}" for a ${courseType} course at a ${difficultyLevel} level. The study material should be organized as a JSON object with the following structure:
    {
      "courseTitle": string,
      "difficulty": string,
      "summary": string,
      "chapters": [
        {
          "chapterTitle": string,
          "summary": string,
          "topics": [string]
        }
      ]
    }
    Return ONLY the JSON object, without any markdown formatting or additional text.`;
    // Generate content using the correct method
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response if it comes with markdown formatting
    const cleanText = text.replace(/^```json|```$/g, '').trim();
    
    return JSON.parse(cleanText);
  } catch (error) {
    console.error('AI Generation Error:', error);
    throw new Error(`AI generation failed: ${error.message}`);
  }
}

module.exports = { generateStudyMaterial };