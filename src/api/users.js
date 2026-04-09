import { request } from "./client";

export function registerUser(form) {
  return request("/users/register", {
    method: "POST",
    body: JSON.stringify({
      email: form.email,
      password: form.password,
      telephone: form.telephone,
      firstName: form.firstName,
      lastName: form.lastName,
    }),
  });
}

export function verifyUser(email, token) {
  const query = new URLSearchParams({ email, token }).toString();
  return request("/users/verify?" + query);
}
