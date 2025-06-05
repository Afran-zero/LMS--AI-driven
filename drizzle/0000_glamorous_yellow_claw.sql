CREATE TABLE "chapterNotes" (
	"id" serial PRIMARY KEY NOT NULL,
	"chapterId" varchar(255) NOT NULL,
	"courseId" varchar(255) NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "studyMaterial" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" varchar(255) NOT NULL,
	"courseType" varchar(255) NOT NULL,
	"topic" varchar(255) NOT NULL,
	"difficultyLevel" varchar(255) DEFAULT 'Easy',
	"courseLayout" json,
	"createdBy" varchar NOT NULL,
	"status" varchar DEFAULT 'Generating'
);
--> statement-breakpoint
CREATE TABLE "studyTypeContent" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" varchar(255) NOT NULL,
	"type" varchar NOT NULL,
	"content" json,
	"status" varchar DEFAULT 'Generating'
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"is_member" boolean DEFAULT false NOT NULL
);
