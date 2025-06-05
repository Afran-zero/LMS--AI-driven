
import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { CHAPTER_NOTEs_TABLE, STUDY_MATERIAL_TABLE } from '@/configs/schema';
import { eq } from 'drizzle-orm';

export async function POST(req) {
  try {
    const { courseId: uuidCourseId, studyType } = await req.json();
    console.log('API received:', { uuidCourseId, studyType });

    // Map UUID courseId to STUDY_MATERIAL_TABLE.id and fetch courseLayout
    const course = await db
      .select({ id: STUDY_MATERIAL_TABLE.id, courseLayout: STUDY_MATERIAL_TABLE.courseLayout })
      .from(STUDY_MATERIAL_TABLE)
      .where(eq(STUDY_MATERIAL_TABLE.courseId, uuidCourseId));

    if (course.length === 0) {
      console.log(`No course found for courseId: ${uuidCourseId}`);
      return NextResponse.json({
        success: false,
        message: `No course found for ID: ${uuidCourseId}`,
        data: [],
      });
    }

    const courseId = course[0].id; // e.g., 7
    const courseLayout = course[0].courseLayout || {}; // e.g., { courseTitle, difficulty, summary, chapters: [...] }

    if (studyType === 'ALL') {
      const notes = await db
        .select({
          id: CHAPTER_NOTEs_TABLE.id,
          chapterId: CHAPTER_NOTEs_TABLE.chapterId,
          courseId: CHAPTER_NOTEs_TABLE.courseId,
          notes: CHAPTER_NOTEs_TABLE.notes,
        })
        .from(CHAPTER_NOTEs_TABLE)
        .where(eq(CHAPTER_NOTEs_TABLE.courseId, courseId.toString()));

      console.log('Fetched notes for ALL:', notes);

      const formattedNotes = notes.map((note, index) => {
        // Extract chapterTitle using chapterId as index
        let chapterTitle = `Note ${index + 1}`; // Default title
        if (courseLayout.chapters && Array.isArray(courseLayout.chapters)) {
          const chapterIndex = parseInt(note.chapterId, 10);
          if (!isNaN(chapterIndex) && chapterIndex >= 0 && chapterIndex < courseLayout.chapters.length) {
            chapterTitle = courseLayout.chapters[chapterIndex].chapterTitle || chapterTitle;
          }
        }

        return {
          id: note.id,
          title: chapterTitle,
          content: note.notes || 'No content available',
          chapterId: note.chapterId,
        };
      });

      const result = {
        notes: formattedNotes,
        flashcard: null,
        quiz: null,
        qa: null,
      };

      return NextResponse.json({ success: true, result });
    } else if (studyType === 'notes') {
      const notes = await db
        .select({
          id: CHAPTER_NOTEs_TABLE.id,
          chapterId: CHAPTER_NOTEs_TABLE.chapterId,
          courseId: CHAPTER_NOTEs_TABLE.courseId,
          notes: CHAPTER_NOTEs_TABLE.notes,
        })
        .from(CHAPTER_NOTEs_TABLE)
        .where(eq(CHAPTER_NOTEs_TABLE.courseId, courseId.toString()));

      console.log('Fetched notes:', notes);

      const formattedNotes = notes.map((note, index) => {
        // Extract chapterTitle using chapterId as index
        let chapterTitle = `Note ${index + 1}`; // Default title
        if (courseLayout.chapters && Array.isArray(courseLayout.chapters)) {
          const chapterIndex = parseInt(note.chapterId, 10);
          if (!isNaN(chapterIndex) && chapterIndex >= 0 && chapterIndex < courseLayout.chapters.length) {
            chapterTitle = courseLayout.chapters[chapterIndex].chapterTitle || chapterTitle;
          }
        }

        return {
          id: note.id,
          title: chapterTitle,
          content: note.notes || 'No content available',
          chapterId: note.chapterId,
        };
      });

      return NextResponse.json({
        success: true,
        data: formattedNotes,
      });
    }

    return NextResponse.json({ success: false, message: 'Invalid studyType' }, { status: 400 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
