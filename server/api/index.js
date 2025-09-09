require("dotenv").config();

import { handle } from "hono/vercel";
const { Hono } = require("hono");
const useRoutes = require("../hooks/useRoutes");
const useCors = require("../hooks/useCors");
const app = new Hono().basePath("/api");

useCors(app);
useRoutes(app);

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const OPTIONS = handler;