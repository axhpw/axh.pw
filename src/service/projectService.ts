import { readJSON, writeJSON } from "../lib/helpers";

export type Project = {
  title: string;
  subtitle: string;
  description: string;
};

const PROJECTS_PATH = "./storage/projects.json";

export async function getProjects(): Promise<Project> {
  return readJSON(PROJECTS_PATH);
}
[];
