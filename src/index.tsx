/** @jsxImportSource hono/jsx */

import { Hono } from "hono";
import { serveStatic } from "hono/bun";

// LIBRARY IMPORTS
import {
  verifyPassword,
  createSession,
  clearSession,
  requireAuth,
} from "./lib/auth";

// SERVICE IMPORTS
import { getProfile } from "./service/profileService";
import { getProjects } from "./service/projectService";

const app = new Hono();

declare module "bun" {
  interface Env {
    ADMIN_PASSWORD: string;
    COOKIE_SECRET: string;
  }
}

app.use("/*", serveStatic({ root: "./public" }));

app.get("/api/profile", async (c) => {
  const profile = await getProfile();
  return c.json(profile);
});

app.get("/api/projects", async (c) => {
  const projects = await getProjects();
  return c.json(projects);
});

export default app;
