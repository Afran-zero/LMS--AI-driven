import { inngest } from "@/inngest/client";
import { db } from "@/configs/db";
import { CHAPTER_NOTEs_TABLE, users ,STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { generateNotesAiModel } from "@/configs/AiModel";





export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const result = await step.run("check user and create new", async () => {
      try {
        const user = event.data.user;
        if (!user) {
          console.error("No user object available");
          throw new Error("No user object provided in event");
        }

        const email = user.primaryEmailAddress?.emailAddress;
        if (!email) {
          throw new Error("No email available for the user");
        }

        const user_name =
          user.username ||
          user.fullName ||
          email.split("@")[0] ||
          "New User";

        console.log("User data:", { email, user_name, user });

        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, email));

        if (existingUser.length === 0) {
          await db.insert(users).values({
            user_name,
            email,
            is_member: false,
          });
          console.log("New user created successfully:", { email, user_name });
        } else {
          console.log("User already exists:", email);
        }

        return { email, user_name };
      } catch (error) {
        console.error("Database operation failed:", error);
        throw error;
      }
    });

    return { status: "success", data: result };
  }
);

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course } = event.data;

    const notesResult = await step.run("Generate Chapter Notes", async () => {
      
      if (!course || !course.courseLayout) {
        throw new Error('Invalid course data or missing courseLayout');
      }
      const chapters = course?.courseLayout?.chapters || [];
      
      // Validate we have chapters to process
      if (!chapters.length) {
        throw new Error("No chapters found in course layout");
      }

      // Process chapters sequentially
      for (let index = 0; index < chapters.length; index++) {
        const chapter = chapters[index];
        
        try {
          const htmlContent = await generateNotesAiModel({
            chapterTitle: chapter.chapterTitle,
            summary: chapter.summary,
            topics: chapter.topics
          });

          await db.insert(CHAPTER_NOTEs_TABLE).values({
            chapterId: index,
            courseId: course.courseId,
            notes: htmlContent
          });
        } catch (error) {
          console.error(`Failed to generate notes for chapter ${index}:`, error);
          throw error; // Fail the entire process if any chapter fails
        }
      }

      return `Generated notes for ${chapters.length} chapters`;
    });

    const updateCourseStatusResult = await step.run("Update Course Status", async () => {
      return await db.update(STUDY_MATERIAL_TABLE)
        .set({ status: 'Ready' })
        .where(eq(STUDY_MATERIAL_TABLE.id, course.courseId));
    });

    return {
      notesGenerated: notesResult,
      statusUpdated: updateCourseStatusResult
    };
  }
);