import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().min(1, "Name is required"),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const createPortfolioSchema = z.object({
  name: z.string().min(1, "Portfolio name is required"),
  content: z.string().min(1, "Portfolio content is required"),
});

export const updatePortfolioSchema = z.object({
  publicId: z.string().min(1, "Public ID is required"),
  portfolioCode: z.string().min(1, "Portfolio code is required"),
});
