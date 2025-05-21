import { NextResponse } from "next/server";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { db } from "@/configs/db";
import { generateStudyMaterial } from "@/configs/AiModel";
import { inngest } from "@/inngest/client";

export async function POST(req) {
  try {
    // Validate request data
    const { courseId, topic, courseType, difficultyLevel, createdBy } = await req.json();
    
    if (!topic || !courseType || !difficultyLevel || !createdBy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate content using the imported function
    const aiResult = await generateStudyMaterial(topic, courseType, difficultyLevel);

    // Save to database
    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
      courseId,
      courseType,
      topic,
      difficultyLevel,
      createdBy,
      courseLayout: aiResult
    }).returning();

    //trigger inngest function
   const result = await inngest.send({
  name: 'notes.generate',
  data: {
    course: {
      ...dbResult[0],
      courseId: dbResult[0].id // Ensure courseId is properly mapped
    }
  }
});

console.log('Inngest trigger result:', result);
    return NextResponse.json({ result: dbResult[0] });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}