import { getSignedCookie, setSignedCookie, deleteCookie, getCookie } from "hono/cookie";
import type { Context, MiddlewareHandler } from "hono";
import { ADMIN_PASSWORD_HASH, COOKIE_SECRET } from "./env";

const SESSION_COOKIE = 'alex_admin_session';

export async function verifyPassword(password: string) {

    // console.log(JSON.stringify(ADMIN_PASSWORD_HASH))
    // console.log(ADMIN_PASSWORD_HASH.slice(0, 40))
    // console.log(ADMIN_PASSWORD_HASH.length)

    return await Bun.password.verify(password,  ADMIN_PASSWORD_HASH);
}

export async function createSession(c: Context) {
    await setSignedCookie(c, SESSION_COOKIE, 'authenticated', COOKIE_SECRET,{
        httpOnly: true,
        secure: Bun.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7// 1 day
    });
}

export async function isAuthenticated(c: Context) {
    const session = await getSignedCookie(c, COOKIE_SECRET, SESSION_COOKIE);

    const raw = getCookie(c, SESSION_COOKIE)
    const signed = await getSignedCookie(c, COOKIE_SECRET, SESSION_COOKIE)

    console.log('raw cookie:', raw)
    console.log('signed cookie:', signed)
    console.log('secret length:', COOKIE_SECRET.length)

    return session === 'authenticated';
}

export function clearSession(c: Context) {
    deleteCookie(c, SESSION_COOKIE, {
        path: '/',
    });
}

export const requireAuth: MiddlewareHandler = async (c, next) => {
    const authed = await isAuthenticated(c);
    if (!authed) {
        return c.redirect('/login');
    }
    await next();
}