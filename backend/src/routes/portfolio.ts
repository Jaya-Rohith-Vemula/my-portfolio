import { Hono } from "hono";
import { createPortfolioSchema } from "../zodSchemas";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { generateHtmlWithGroq } from "../utils/groq";

export const portfolioRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    GROQ_API_KEY: string;
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

  const parsedResult = createPortfolioSchema.safeParse(body);
  if (!parsedResult.success) {
    c.status(400);
    return c.json({
      message: "Invalid input",
      errors: parsedResult.error.errors,
    });
  }

  const apiKey = c.env.GROQ_API_KEY;

  const html: string = await generateHtmlWithGroq(
    {
      content: body.content,
    },
    apiKey
  );

  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const portfolio = await prisma.portfolio.create({
      data: {
        name: body.name,
        content: body.content,
        userId,
        page: html,
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

portfolioRouter.get("/list-by-user", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");

  try {
    const list = await prisma.portfolio.findMany({
      where: {
        userId,
      },
    });

    return c.json(list);
  } catch (e) {
    {
      c.status(500);
      console.error("Error fetching portfolios:", e);
      return c.json({
        message:
          "Unable to fetch portfolios at this time. Please try again later",
      });
    }
  }
});
