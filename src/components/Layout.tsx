/** @JsxImportSource hono/jsx */

import type { Child } from "hono/jsx";

type LayoutProps = {
  children: Child;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Alexander S. Harrop</title>
        <link rel="stylesheet" href="/public/catpuccin.css" />
      </head>
      <body>
        <main class="page">{children}</main>
      </body>
    </html>
  );
};
