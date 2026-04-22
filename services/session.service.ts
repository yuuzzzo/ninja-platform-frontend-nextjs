"use client";

export interface SessionUser {
  id: number;
  user: string;
  email: string;
}

const SESSION_KEY = "ninjaUserSession";

export function saveSession(user: SessionUser) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  localStorage.setItem("loggedIn", "true");
}

export function getSessionUser(): SessionUser | null {
  const userData = localStorage.getItem(SESSION_KEY);
  if (!userData) return null;

  try {
    const parsed = JSON.parse(userData) as SessionUser;
    if (!parsed?.id) return null;
    return parsed;
  } catch {
    return null;
  }
}
