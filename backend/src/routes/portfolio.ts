import { Hono } from "hono";
import { createPortfolioSchema } from "../zodSchemas";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const portfolioRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

portfolioRouter.use("/*", async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ message: "jwt is not provided" });
  }
  try {
    const token = jwt.split(" ")[1];
    const user = await verify(token, c.env.JWT_SECRET);
    if (user && typeof user.id === "string") {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(401);
      return c.json({ message: "jwt is not valid" });
    }
  } catch (e) {
    c.status(401);
    return c.json({ message: "jwt is not valid" });
  }
});

portfolioRouter.post("/create", async (c) => {
  const body = await c.req.json();

  const parseResult = createPortfolioSchema.safeParse(body);
  if (!parseResult.success) {
    c.status(400);
    return c.json({
      message: "Invalid input",
      errors: parseResult.error.errors,
    });
  }

  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const portfolio = await prisma.portfolio.create({
      data: {
        name: body.name,
        content: body.content,
        userId: userId,
      },
    });

    return c.json(portfolio);
  } catch (e) {
    c.status(500);
    console.error("Error creating portfolio:", e);
    return c.json({
      message:
        "Unable to create portfolio at this time. Please try again later",
    });
  }
});
