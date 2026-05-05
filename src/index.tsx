/** @jsxImportSource hono/jsx */

import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { Layout } from './components/Layout'
import { ProfileCard } from './components/ProfileCard'
import { Projects } from './components/Projects'
import { verifyPassword, createSession, clearSession, requireAuth } from './lib/auth'

const app = new Hono()

const file = Bun.file("storage/cards.json");

declare module "bun" {
  interface Env {
    ADMIN_PASSWORD: string;
    COOKIE_SECRET: string;
  }
}

app.use('/public/*', serveStatic({ root: './' }))

app.get('/', async (c) => {

  const name = 'Alex'

  const data = await file.json();

  console.log(data)

  return c.html(
    <Layout>
      <div class="page-stack">
        <ProfileCard/>
        <Projects projects={data.cards} />
      </div>
    </Layout>
  )
})

app.get('/login', (c) => {
  return c.html(
    <Layout>
      <section class="card">
        <h1>Admin Login</h1>
        <p class="bio">Private access for updating this site.</p>

        <form method="post" action="/login" class="login-form">
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autocomplete="current-password"
          />
          <button type="submit">Log in</button>
        </form>
      </section>
    </Layout>
  )
})


app.post('/login', async (c) => {
  const body = await c.req.parseBody()
  const password = body.password

  if (typeof password !== 'string') {
    return c.text('Invalid request', 400)
  }

  const ok = await verifyPassword(password)

  if (!ok) {
    return c.html(
      <Layout>
        <section class="card">
          <h1>Admin Login</h1>
          <p class="bio">Wrong password.</p>

          <form method="post" action="/login" class="login-form">
            <label for="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autocomplete="current-password"
            />
            <button type="submit">Log in</button>
          </form>
        </section>
      </Layout>,
      401
    )
  }

  await createSession(c)
  return c.redirect('/admin')
})

app.get('/admin', requireAuth, (c) => {
  return c.html(
    <Layout>
      <section class="card">
        <h1>Admin</h1>
        <p class="bio">You are logged in.</p>

        <form method="post" action="/logout">
          <button type="submit">Log out</button>
        </form>
      </section>
    </Layout>
  )
})

app.post('/logout', requireAuth, (c) => {
  clearSession(c)
  return c.redirect('/')
})

export default app
