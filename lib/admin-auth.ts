import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const ADMIN_COOKIE = "maurice_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 8;

function secret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);

  if (aBuffer.length !== bBuffer.length) {
    return false;
  }

  return timingSafeEqual(aBuffer, bBuffer);
}

export function isAdminAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && secret());
}

export function isValidAdminPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!expected) {
    return false;
  }

  return safeEqual(password, expected);
}

export function createAdminSession() {
  const issuedAt = Date.now().toString();
  return `${issuedAt}.${sign(issuedAt)}`;
}

export async function isAdminAuthenticated() {
  if (!isAdminAuthConfigured()) {
    return false;
  }

  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_COOKIE)?.value;

  if (!value) {
    return false;
  }

  const [issuedAt, signature] = value.split(".");

  if (!issuedAt || !signature || !safeEqual(signature, sign(issuedAt))) {
    return false;
  }

  const age = Date.now() - Number(issuedAt);
  return Number.isFinite(age) && age >= 0 && age <= SESSION_MAX_AGE * 1000;
}

export async function setAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_COOKIE, createAdminSession(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}
