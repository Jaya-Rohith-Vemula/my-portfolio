import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { cors } from "hono/cors";
import { portfolioRouter } from "./routes/portfolio";

const app = new Hono();

app.use("/*", cors());
app.route("api/v1/user", userRouter);
app.route("api/v1/portfolio", portfolioRouter);

export default app;
