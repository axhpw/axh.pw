/** @JsxImportSource hono/jsx */

import { Socials } from "./Socials";

export const ProfileCard = () => {
  return (
    <div class="card">
      <img class="avatar" src="/public/me.jpg" alt="profile picture" />
      <h1>Alexander S. Harrop</h1>
      <p class="bio">IT Student - Future Systems Admin</p>
      <Socials />
    </div>
  );
};
