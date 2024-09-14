import { getServerSession } from "next-auth";
import { createSafeActionClient } from "next-safe-action";
import { options } from "@/lib/auth";
export const actionClient = createSafeActionClient();

export const authActionClient = actionClient
  // Define authorization middleware.
  .use(async ({ next }) => {
    const session = await getServerSession(options);

    if (!session || !session.user) {
      throw new Error("Session not found!");
    }

    // Return the next middleware with `userId` value in the context
    return next({ ctx: { user: session.user } });
  });
