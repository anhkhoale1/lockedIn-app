const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export async function request(path, options = {}) {
  const res = await fetch(API_BASE_URL + path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const type = res.headers.get("content-type") || "";
  const data = type.includes("application/json") ? await res.json() : await res.text();

  if (!res.ok) {
    const message =
      (data && typeof data === "object" && (data.message || data.error)) ||
      data ||
      "Request failed";

    const error = new Error(Array.isArray(message) ? message.join(", ") : message);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}
