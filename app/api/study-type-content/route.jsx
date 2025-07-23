import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const { chapters, courseId, type } = await req.json();
    console.log("Received study-type-content request:", { courseId, type, chapters });

    // Validate input
    if (!courseId || !type || !chapters) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: courseId, type, or chapters" },
        { status: 400 }
      );
    }

    // Validate study type
    const validTypes = ["flashcard", "quiz", "qa"];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { success: false, message: `Invalid study type: ${type}. Must be one of ${validTypes.join(", ")}` },
        { status: 400 }
      );
    }

    // Generate prompt based on study type
    let prompt = "";
    if (type === "flashcard") {
      prompt = `Generate flashcards on the topics: ${chapters}. Each flashcard should include:
      - front: a concise question, term, or concept
      - back: a clear, informative answer or explanation
      Generate a maximum of 15 flashcards. Output the result as a JSON array with objects containing front and back fields only.`;
    } else if (type === "quiz") {
      prompt = `Generate quiz questions on the topics: ${chapters}. Each quiz question should include:
      - question: a clear, concise question
      - options: an array of 4 possible answers
      - correctAnswer: the index (0-3) of the correct answer
      Generate a maximum of 10 quiz questions. Output the result as a JSON array with objects containing question, options, and correctAnswer fields.`;
    } else if (type === "qa") {
      prompt = `Generate question-and-answer pairs on the topics: ${chapters}. Each pair should include:
      - question: a detailed, open-ended question
      - answer: a comprehensive, informative answer
      Generate a maximum of 10 question-and-answer pairs. Output the result as a JSON array with objects containing question and answer fields.`;
    }

    // Generate unique recordId
    const recordId = uuidv4();

    // Insert placeholder record into STUDY_TYPE_CONTENT_TABLE
    const result = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
      id: recordId,
      courseId: courseId,
      type: type,
      content: [], // Initial empty content
      status: "Generating",
    }).returning({ id: STUDY_TYPE_CONTENT_TABLE.id });

    if (!result[0]?.id) {
      throw new Error("Failed to insert record into STUDY_TYPE_CONTENT_TABLE");
    }

    // Trigger Inngest event
    await inngest.send({
      name: "studyType.content",
      data: {
        courseId: courseId,
        studyType: type,
        prompt: prompt,
        recordId: result[0].id,
      },
    });

    return NextResponse.json({
      success: true,
      message: `${type} content generation started`,
      id: result[0].id,
    });
  } catch (error) {
    console.error("Error in /api/study-type-content:", error);
    return NextResponse.json(
      { success: false, message: `Server error: ${error.message}` },
      { status: 500 }
    );
  }
}