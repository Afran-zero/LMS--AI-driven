import { GoogleGenerativeAI } from '@google/generative-ai';

async function generateStudyMaterial(topic, courseType, difficultyLevel) {
  try {
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    
    // Get the generative model instance
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
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
          "emoji": string,
          "summary": string,
          "topics": [string]
        }
      ]
    }
    Return ONLY the JSON object, without any markdown formatting or additional text.`;

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

export const generateNotesAiModel = async (chapterData) => {
  // Validate input
  if (!chapterData?.chapterTitle || !Array.isArray(chapterData?.topics)) {
    throw new Error("Invalid chapter data structure");
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // Note: "gemini-2.0-flash" doesn't exist, corrected to 1.5
      generationConfig: {
        responseMimeType: "text/plain",
        temperature: 0.3
      }
    });

    const prompt = `As an expert educator, generate comprehensive study material in HTML format (without HTML/HEAD/BODY tags) for this chapter:
    
    ## Chapter: ${chapterData.chapterTitle}
    ### Summary: ${chapterData.summary}
    
    ### Topics to Cover:
    ${chapterData.topics.map(t => `- ${t}`).join('\n')}
    
    ### Requirements:
    1. Create detailed content for each topic
    2. Use semantic HTML (<section>, <h2>-<h4>, <ul>, <p>)
    3. Include practical examples
    4. Add key definitions in <strong> tags
    5. Structure for optimal readability`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let htmlContent = response.text();

    // Clean and validate the response
    htmlContent = htmlContent.replace(/^```html|```$/g, '').trim();
    if (!htmlContent.startsWith('<')) {
      throw new Error("AI response is not valid HTML");
    }

    return htmlContent;
  } catch (error) {
    console.error('AI Generation Failed:', {
      chapter: chapterData.chapterTitle,
      error: error.message
    });
    throw new Error(`Failed to generate content for "${chapterData.chapterTitle}": ${error.message}`);
  }
};

export { generateStudyMaterial };


const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
const chapters = 'default topic'; // Fallback value
export const GenerateStudyTypeContentAiModel = model.startChat({
  generationConfig: {
    temperature: 0.3,
    maxOutputTokens: 8192,
    topP: 0.8,
    topK: 40,
    responseMimeType: 'application/json',
    model: 'gemini-1.5-flash',
  },
  history: [
    {
      role: 'user',
      parts: [
        {
          text: `Generate flashcards on the topics: ${chapters}. Each flashcard should include: - front: a concise question, term, or concept - back: a clear, informative answer or explanation Generate a maximum of 15 flashcards. Output the result as a JSON array with objects containing front and back fields only.`,
        },
      ],
    },
    // ... rest of the history
  ],
});
