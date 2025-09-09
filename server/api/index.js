import { handle } from "hono/vercel";

require("dotenv").config();
const { Hono } = require("hono");
const useRoutes = require("../hooks/useRoutes");
const useCors = require("../hooks/useCors");
const app = new Hono().basePath("/api");

useCors(app);
useRoutes(app);

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PATCH = handler;
export const PUT = handler;
export const OPTIONS = handler;
export const DELETE = handler;

// module.exports = app;
