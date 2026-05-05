/** @jsxImportSource hono/jsx */

import { Hono } from "hono";
import { serveStatic } from "hono/bun";

// COMPONENT IMPORTS
import { Layout } from "./components/Layout";
import { ProfileCard } from "./components/ProfileCard";
import { Projects } from "./components/Projects";

// LIBRARY IMPORTS
import {
  verifyPassword,
  createSession,
  clearSession,
  requireAuth,
} from "./lib/auth";
import { getProfile } from "./service/profileService";

const app = new Hono();

const file = Bun.file("storage/cards.json");

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

export default app;
