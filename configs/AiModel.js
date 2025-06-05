import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Get the generative model instance
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "application/json"
  }
});

async function generateStudyMaterial(topic, courseType, difficultyLevel) {
  try {
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

export const GenerateStudyTypeContentAiModel = async (chapterTitles, studyType) => {
  try {
    const prompt = `Based on the study type, generate one of the following:
        
For flashcards:
- Generate flashcards on the topics: [${chapterTitles.join(", ")}]
- Each flashcard should include:
  - 'front': a concise question, term, or concept
  - 'back': a clear, informative answer or explanation
- Generate a maximum of 15 flashcards
- Output format: { "type": "flashcards", "content": [...] }

For quizzes:
- Generate a 20-question quiz on: [${chapterTitles.join(", ")}]
- Each question should include:
  - 'question': the question text
  - 'options': array of 4 possible answers
  - 'answer': index of correct option
  - 'explanation': brief explanation
- Mix question types (multiple choice, true/false)
- Output format: { "type": "quiz", "content": [...] }

For Q&A:
- Generate comprehensive Q&A on: [${chapterTitles.join(", ")}]
- Each item should include:
  - 'question': detailed question
  - 'answer': thorough explanation
  - 'keyPoints': array of important points
- Generate 10-15 Q&A pairs
- Output format: { "type": "qa", "content": [...] }

Return JSON with the appropriate structure based on the study type requested.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const cleanText = text.replace(/^```json|```$/g, '').trim();
    const parsed = JSON.parse(cleanText);

    // Validate the response structure
    if (!parsed.type || !parsed.content || parsed.type !== studyType) {
      throw new Error("Invalid AI response structure");
    }

    return parsed;
  } catch (error) {
    console.error('Study Type Generation Failed:', error);
    throw new Error(`Failed to generate ${studyType} content: ${error.message}`);
  }
};

export { generateStudyMaterial };