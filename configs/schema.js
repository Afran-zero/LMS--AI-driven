
import { text } from "drizzle-orm/gel-core";
import { pgTable, serial, varchar, boolean, json } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  user_name: varchar("user_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  isMember: boolean("is_member").default(false).notNull(),
})

export const STUDY_MATERIAL_TABLE=pgTable("studyMaterial",{
  id:serial("id").primaryKey(),
  courseId:varchar("courseId",{length:255}).notNull(),
  courseType:varchar("courseType",{length:255}).notNull(),
  topic:varchar("topic",{length:255}).notNull(),
  difficultyLevel:varchar("difficultyLevel",{length:255}).default('Easy'),
  courseLayout:json(),
  createdBy:varchar().notNull(),
  status:varchar().default('Generating'),
})

export const CHAPTER_NOTEs_TABLE= pgTable('chapterNotes',{
  id:serial("id").primaryKey(),
  chapterId:varchar("chapterId",{length:255}).notNull(),
  courseId:varchar("courseId",{length:255}).notNull(),
  notes:text()


})