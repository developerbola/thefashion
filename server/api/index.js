import { config as configDotenv } from "dotenv";
configDotenv();

import { handle } from "hono/vercel";
import { Hono } from "hono";
import useRoutes from "../hooks/useRoutes.js";
import useCors from "../hooks/useCors.js";

const app = new Hono().basePath("/api");

useCors(app);
useRoutes(app);

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const OPTIONS = handler;
export default app;
