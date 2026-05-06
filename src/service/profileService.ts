import { readJSON, writeJSON } from "../lib/helpers";

export type Profile = {
  name: string;
  bio: string;
  avatarUrl: string;
  links: {
    label: string;
    url: string;
  }[];
};

const PROFILE_PATH = "./storage/profile.json";

export async function getProfile(): Promise<Profile> {
  return readJSON(PROFILE_PATH);
}
