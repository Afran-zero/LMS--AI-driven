import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
 
  dbCredentials: {
    url:'postgresql://neondb_owner:npg_97XZAoVzKlDj@ep-black-breeze-a4hk0n6q.us-east-1.aws.neon.tech/neondb?sslmode=require'
  },
  verbose: true,
  strict: true,
});