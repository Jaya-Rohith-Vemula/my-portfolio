import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import { signupSchema, signinSchema } from "../zodSchemas";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const parseResult = signupSchema.safeParse(body);
  if (!parseResult.success) {
    c.status(400);
    return c.json({
      message: "Invalid input",
      errors: parseResult.error.errors,
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const isUserInSystem = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (isUserInSystem) {
      c.status(409);
      return c.json({
        error: "Conflict",
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        username: body.username,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token,
    });
  } catch (e) {
    c.status(401);
    return c.json({
      message: "Unable to create user at this time. Please try again later",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const parseResult = signinSchema.safeParse(body);
  if (!parseResult.success) {
    c.status(400);
    return c.json({
      message: "Invalid input",
      errors: parseResult.error.errors,
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({ message: "User not found" });
  }

  const passwordMatches = await bcrypt.compare(body.password, user.password);
  if (!passwordMatches) {
    c.status(403);
    return c.json({ message: "Invalid email or password" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    jwt,
  });
});
