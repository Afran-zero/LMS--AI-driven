
import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";

export async function POST(req) {
  const { chapters,courseId,type } = await req.json();

    const PROMPT = 'Generate flashcards on the topics: '+chapters+'. Each flashcard should include:- front: a concise question, term, or concept- back: a clear, informative answer or explanation Generate a maximum of 15 flashcards. Output the result as a JSON array with objects containing front and back fields only.'
 
 // insert to db ,update status

    const result = await db.insert(STUDY_TYPE_CONTENT_TABLE).values({
    courseId: courseId,
    type: type,
    
  }).returning({id: STUDY_TYPE_CONTENT_TABLE.id});

  //trigger ingest
  await inngest.send({
    name: "studyType.content",
    data: {
      courseId: courseId,
      studyType: type,
      prompt: PROMPT,
      recordId: result[0].id
    }
  });
  return NextResponse.json({
    id: result[0].id
  });

}