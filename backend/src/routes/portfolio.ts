import { Hono } from "hono";
import { createPortfolioSchema, updatePortfolioSchema } from "../zodSchemas";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { generateHtmlWithGroq } from "../utils/groq";
import { nanoid } from "../utils/utils";

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

portfolioRouter.get("/view", async (c) => {
  const userId = c.get("userId");
  let { publicId } = c.req.query();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        publicId,
        userId,
      },
      select: {
        page: true,
      },
    });

    if (!portfolio) {
      c.status(404);
      return c.json({ message: "Portfolio not found" });
    }

    return c.json({ page: portfolio.page });
  } catch (e) {
    c.status(500);
    console.error("Error fetching portfolio page:", e);
    return c.json({
      message: "Unable to fetch portfolio at this time. Please try again later",
    });
  }
});

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

  try {
    let html: string = await generateHtmlWithGroq(
      {
        content: body.content,
      },
      apiKey
    );

    html = html.replace("```html\n", "");
    html = html.replace("\n```", "");

    const userId = c.get("userId");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    let publicId = nanoid();

    let collision = await prisma.portfolio.findUnique({ where: { publicId } });
    while (collision) {
      publicId = nanoid();
      collision = await prisma.portfolio.findUnique({ where: { publicId } });
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        name: body.name,
        content: body.content,
        userId,
        page: html,
        publicId,
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
      where: { userId },
      include: {
        user: {
          select: { username: true },
        },
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

portfolioRouter.delete("/delete", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const { publicId } = c.req.query();

  try {
    await prisma.portfolio.delete({
      where: {
        publicId,
        userId,
      },
    });

    return c.json({ message: "Portfolio deleted successfully" });
  } catch (e) {
    {
      c.status(500);
      console.error("Error deleting portfolio:", e);
      return c.json({
        message:
          "Unable to delete portfolio at this time. Please try again later",
      });
    }
  }
});

portfolioRouter.put("/update", async (c) => {
  const body = await c.req.json();

  const parsedResult = updatePortfolioSchema.safeParse(body);
  if (!parsedResult.success) {
    c.status(400);
    return c.json({
      message: "Invalid input",
      errors: parsedResult.error.errors,
    });
  }

  const userId = c.get("userId");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.portfolio.update({
      where: {
        publicId: body.publicId,
        userId,
      },
      data: {
        page: body.portfolioCode,
      },
    });

    return c.json({ message: "Portfolio updated successfully" });
  } catch (e) {
    {
      c.status(500);
      console.error("Error updating portfolio:", e);
      return c.json({
        message:
          "Unable to update portfolio at this time. Please try again later",
      });
    }
  }
});
