import { db } from "@/configs/db"
import { NextResponse } from "next/server"
import { eq, and } from "drizzle-orm"
import { STUDY_MATERIAL_TABLE } from "@/configs/schema"

export async function POST(req) {
    try {
        const { courseId, studyType } = await req.json()
        
        console.log('API received:', { courseId, studyType });
        
        if (studyType === 'ALL') {
            // Fetch all study materials for this course
            const allMaterials = await db.select().from(STUDY_MATERIAL_TABLE).where(eq(STUDY_MATERIAL_TABLE.courseId, courseId));
            
            console.log('All materials from DB:', allMaterials);
            
            // Organize by type
            const result = {
                notes: [],
                flashcard: null,
                quiz: null,
                qa: null
            };
            
            allMaterials.forEach(material => {
                switch (material.type) {
                    case 'notes':
                        result.notes.push(material);
                        break;
                    case 'flashcard':
                        result.flashcard = material;
                        break;
                    case 'quiz':
                        result.quiz = material;
                        break;
                    case 'qa':
                        result.qa = material;
                        break;
                }
            });
            
            console.log('Organized result:', result);
            return NextResponse.json({ result });
        }
        
        // Handle individual study type requests
        const result = await db.select().from(STUDY_MATERIAL_TABLE).where(
            and(
                eq(STUDY_MATERIAL_TABLE.courseId, courseId),
                eq(STUDY_MATERIAL_TABLE.type, studyType)
            )
        );
        
        return NextResponse.json({ result });
        
    } catch (error) {
        console.error('Error in study-type API:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}