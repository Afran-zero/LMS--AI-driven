import { pgTable, serial, varchar, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  user_name: varchar("user_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  isMember: boolean("is_member").default(false).notNull(),
});