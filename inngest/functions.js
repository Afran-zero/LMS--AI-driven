import { inngest } from "@/inngest/client";
import { db } from "@/configs/db";
import { users } from "@/configs/schema";
import { eq } from "drizzle-orm";



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