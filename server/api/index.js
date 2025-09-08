require("dotenv").config();
const { Hono } = require("hono");
const useRoutes = require("../hooks/useRoutes");
const useCors = require("../hooks/useCors");
const app = new Hono();

useCors(app);
useRoutes(app);

module.exports = app;
