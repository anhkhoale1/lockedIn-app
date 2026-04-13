const SESSION_STORAGE_KEY = "lockedin.auth.session";

function readBooleanFlag(value) {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true" || normalized === "1") return true;
    if (normalized === "false" || normalized === "0") return false;
  }
  return null;
}

function pickVerificationFlag(source) {
  if (!source || typeof source !== "object") return null;

  const keys = [
    "isVerified",
    "verified",
    "emailVerified",
    "isEmailVerified",
    "email_verified",
  ];

  for (const key of keys) {
    if (key in source) {
      const parsed = readBooleanFlag(source[key]);
      if (parsed !== null) return parsed;
    }
  }

  return null;
}

export function toSessionUser(authResponse, fallback = {}) {
  const user =
    authResponse && typeof authResponse.user === "object"
      ? authResponse.user
      : authResponse || {};

  const verification =
    pickVerificationFlag(user) ?? pickVerificationFlag(authResponse) ?? false;

  return {
    id: user.id || user._id || null,
    email: user.email || fallback.email || "",
    firstName: user.firstName || fallback.firstName || "",
    lastName: user.lastName || fallback.lastName || "",
    isVerified: verification,
    token:
      authResponse?.token ||
      authResponse?.accessToken ||
      authResponse?.jwt ||
      null,
  };
}

export function saveSession(user) {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
}

export function getSession() {
  const raw = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

export function markSessionVerified(email) {
  const current = getSession();
  if (!current) return;

  if (email && current.email && current.email !== email) return;

  saveSession({
    ...current,
    isVerified: true,
  });
}
