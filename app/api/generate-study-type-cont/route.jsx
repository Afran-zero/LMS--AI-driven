import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";

    
     
              

export async function POST(req) {
  const { chapters,courseId,type } = await req.json();
  const PROMPT = `Generate flashcards on the topics: [${chapters.join(", ")}]. Each flashcard should include:
- 'front': a concise question, term, or concept
- 'back': a clear, informative answer or explanation
Generate a maximum of 15 flashcards. Output the result as a JSON array with objects containing 'front' and 'back' fields only.`
 

 const result = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
    courseId: courseId,
    type: type,
    content: PROMPT
  }).returning({id: STUDY_TYPE_CONTENT_TABLE.id});
//trigger ingest
  await inngest.send({
    name: "study-type.generate",
    data: {
      courseId: courseId,
      type: type,
      prompt: PROMPT,
      recordId: result[0].id
    }
  });

  return NextResponse.json({
    success: true,
    message: "Flashcards generated successfully",
    data: result
  });
}