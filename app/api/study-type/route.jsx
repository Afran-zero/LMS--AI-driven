import { NextResponse } from 'next/server';
import { db } from '@/configs/db';
import { CHAPTER_NOTEs_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE } from '@/configs/schema';
import { eq, and } from 'drizzle-orm';

export async function POST(req) {
  try {
    const { courseId: uuidCourseId, studyType } = await req.json();
    console.log('API received:', { uuidCourseId, studyType });

    // Retry function for database operations
    async function retryDbOperation(operation, maxRetries = 3) {
      for (let i = 0; i < maxRetries; i++) {
        try {
          return await operation();
        } catch (error) {
          console.log(`Database operation failed (attempt ${i + 1}):`, error.message);
          if (i === maxRetries - 1) throw error;
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Wait 1s, 2s, 3s
        }
      }
    }

    // Map UUID courseId to STUDY_MATERIAL_TABLE.id and fetch courseLayout
    const course = await retryDbOperation(async () => {
      return await db
        .select({ id: STUDY_MATERIAL_TABLE.id, courseLayout: STUDY_MATERIAL_TABLE.courseLayout })
        .from(STUDY_MATERIAL_TABLE)
        .where(eq(STUDY_MATERIAL_TABLE.courseId, uuidCourseId));
    });

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

    // Since STUDY_TYPE_CONTENT_TABLE.courseId is varchar, convert to string
    const courseIdString = courseId.toString();
    
    console.log('Mapped courseId:', courseId, 'as string:',(courseIdString))

    if (studyType === 'ALL') {
      // Fetch notes
      const notes = await db
        .select({
          id: CHAPTER_NOTEs_TABLE.id,
          chapterId: CHAPTER_NOTEs_TABLE.chapterId,
          courseId: CHAPTER_NOTEs_TABLE.courseId,
          notes: CHAPTER_NOTEs_TABLE.notes,
        })
        .from(CHAPTER_NOTEs_TABLE)
        .where(eq(CHAPTER_NOTEs_TABLE.courseId, courseIdString));

      console.log('Fetched notes for ALL:', notes);

      // Format notes
      const formattedNotes = notes.map((note, index) => {
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

      // Fetch content list (use uuidCourseId for STUDY_TYPE_CONTENT_TABLE)
      const contentList = await db
        .select()
        .from(STUDY_TYPE_CONTENT_TABLE)
        .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, uuidCourseId));

      console.log('Content list:', contentList);

      // Find flashcard
      const flashcard = contentList?.find(item => item.type === 'flashcard') || null;
      console.log('Found flashcard:', flashcard);

      const result = {
        notes: formattedNotes,
        flashcard: flashcard,
        quiz: contentList?.find(item => item.type === 'quiz') || null,
        qa: contentList?.find(item => item.type === 'qa') || null,
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
        .where(eq(CHAPTER_NOTEs_TABLE.courseId, courseIdString));

      console.log('Fetched notes:', notes);

      const formattedNotes = notes.map((note, index) => {
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
      
    } else {
      // Handle other study types (flashcard, quiz, qa)
      const content = await db
        .select({
          id: STUDY_TYPE_CONTENT_TABLE.id,
          courseId: STUDY_TYPE_CONTENT_TABLE.courseId,
          type: STUDY_TYPE_CONTENT_TABLE.type,
          content: STUDY_TYPE_CONTENT_TABLE.content,
          status: STUDY_TYPE_CONTENT_TABLE.status,
        })
        .from(STUDY_TYPE_CONTENT_TABLE)
        .where(
          and(
            eq(STUDY_TYPE_CONTENT_TABLE.courseId, uuidCourseId),
            eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
          )
        );

      console.log(`Fetched ${studyType} content:`, content);

      if (content.length === 0) {
        console.log(`No ${studyType} content found for courseId: ${uuidCourseId}`);
        return NextResponse.json({
          success: false,
          message: `No ${studyType} content found for course ID: ${uuidCourseId}`,
          data: [],
        });
      }

      return NextResponse.json({
        success: true,
        data: {
          id: content[0].id,
          courseId: content[0].courseId,
          type: content[0].type,
          content: content[0].content || [], // Ensure content is an array
          status: content[0].status,
        },
      });
    }

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}