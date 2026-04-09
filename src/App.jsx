import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

const API_BASE_URL = "/api";

async function request(path, options = {}) {
  const res = await fetch(API_BASE_URL + path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  const type = res.headers.get("content-type") || "";
  const data = type.includes("application/json")
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && (data.message || data.error)) ||
      data ||
      "Request failed";
    throw new Error(Array.isArray(msg) ? msg.join(", ") : msg);
  }

  return data;
}

async function registerUser(form) {
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

async function verifyUser(email, token) {
  const q = new URLSearchParams({ email, token }).toString();
  return request("/users/verify?" + q);
}

function App() {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    telephone: "",
    firstName: "",
    lastName: "",
  });
  const [registerData, setRegisterData] = useState(null);
  const [registerError, setRegisterError] = useState("");

  const [verifyForm, setVerifyForm] = useState({ email: "", token: "" });
  const [verifyData, setVerifyData] = useState(null);
  const [verifyError, setVerifyError] = useState("");

  const [isLoadingRegister, setIsLoadingRegister] = useState(false);
  const [isLoadingVerify, setIsLoadingVerify] = useState(false);

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setIsLoadingRegister(true);
    setRegisterError("");
    setRegisterData(null);
    try {
      const data = await registerUser(registerForm);
      setRegisterData(data);
    } catch (error) {
      setRegisterError(error.message || "Request failed");
    } finally {
      setIsLoadingRegister(false);
    }
  };

  const handleVerifySubmit = async (event) => {
    event.preventDefault();
    setIsLoadingVerify(true);
    setVerifyError("");
    setVerifyData(null);
    try {
      const data = await verifyUser(verifyForm.email, verifyForm.token);
      setVerifyData(data);
    } catch (error) {
      setVerifyError(error.message || "Request failed");
    } finally {
      setIsLoadingVerify(false);
    }
  };

  return (
    <>
      <section id="center" className="p-8">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div className="mt-8">
          <h1 className="text-4xl font-bold text-text-h mb-4">
            Get started with Tailwind CSS
          </h1>
          <p className="text-lg text-text">
            Edit{" "}
            <code className="bg-code-bg px-2 py-1 rounded">src/App.jsx</code>{" "}
            and save to test{" "}
            <code className="bg-code-bg px-2 py-1 rounded">HMR</code>
          </p>
          <p className="mt-4 text-text">
            Tailwind CSS is now installed and ready to use!
          </p>
        </div>
        <div className="w-full max-w-3xl mt-8 p-6 border border-border rounded-lg bg-social-bg">
          <h2 className="text-2xl font-semibold text-text-h mb-4">API Actions</h2>

          <form className="grid gap-3 mb-6" onSubmit={handleRegisterSubmit}>
            <h3 className="text-xl font-semibold text-text-h">Register User</h3>
            <input
              className="px-3 py-2 rounded border border-border bg-white"
              type="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={(e) =>
                setRegisterForm((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
            <input
              className="px-3 py-2 rounded border border-border bg-white"
              type="password"
              placeholder="Password (minimum 8 characters)"
              value={registerForm.password}
              onChange={(e) =>
                setRegisterForm((prev) => ({ ...prev, password: e.target.value }))
              }
              minLength={8}
              required
            />
            <input
              className="px-3 py-2 rounded border border-border bg-white"
              type="text"
              placeholder="Telephone"
              value={registerForm.telephone}
              onChange={(e) =>
                setRegisterForm((prev) => ({ ...prev, telephone: e.target.value }))
              }
              required
            />
            <input
              className="px-3 py-2 rounded border border-border bg-white"
              type="text"
              placeholder="First Name"
              value={registerForm.firstName}
              onChange={(e) =>
                setRegisterForm((prev) => ({ ...prev, firstName: e.target.value }))
              }
              required
            />
            <input
              className="px-3 py-2 rounded border border-border bg-white"
              type="text"
              placeholder="Last Name"
              value={registerForm.lastName}
              onChange={(e) =>
                setRegisterForm((prev) => ({ ...prev, lastName: e.target.value }))
              }
              required
            />
            <button className="counter px-4 py-2" disabled={isLoadingRegister}>
              {isLoadingRegister ? "Registering..." : "Register"}
            </button>
            {registerData && (
              <pre className="text-xs overflow-auto text-text">
                {JSON.stringify(registerData, null, 2)}
              </pre>
            )}
            {registerError && <p className="text-red-500">{registerError}</p>}
          </form>

          <form className="grid gap-3" onSubmit={handleVerifySubmit}>
            <h3 className="text-xl font-semibold text-text-h">Verify User</h3>
            <input
              className="px-3 py-2 rounded border border-border bg-white"
              type="email"
              placeholder="Email"
              value={verifyForm.email}
              onChange={(e) =>
                setVerifyForm((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
            <input
              className="px-3 py-2 rounded border border-border bg-white"
              type="text"
              placeholder="Token"
              value={verifyForm.token}
              onChange={(e) =>
                setVerifyForm((prev) => ({ ...prev, token: e.target.value }))
              }
              required
            />
            <button className="counter px-4 py-2" disabled={isLoadingVerify}>
              {isLoadingVerify ? "Verifying..." : "Verify"}
            </button>
            {verifyData !== null && (
              <p className="text-text">Result: {String(verifyData)}</p>
            )}
            {verifyError && <p className="text-red-500">{verifyError}</p>}
          </form>
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps" className="mt-12">
        <div id="docs" className="p-6 border border-border rounded-lg mb-6">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2 className="text-2xl font-semibold text-text-h mt-4 mb-2">
            Documentation
          </h2>
          <p className="text-text mb-4">Your questions, answered</p>
          <ul className="space-y-3">
            <li>
              <a
                href="https://vite.dev/"
                target="_blank"
                className="flex items-center gap-3 p-3 hover:bg-accent-bg rounded-lg transition-colors"
              >
                <img className="logo w-6 h-6" src={viteLogo} alt="" />
                <span className="font-medium">Explore Vite</span>
              </a>
            </li>
            <li>
              <a
                href="https://react.dev/"
                target="_blank"
                className="flex items-center gap-3 p-3 hover:bg-accent-bg rounded-lg transition-colors"
              >
                <img className="button-icon w-6 h-6" src={reactLogo} alt="" />
                <span className="font-medium">Learn React</span>
              </a>
            </li>
            <li>
              <a
                href="https://tailwindcss.com/docs"
                target="_blank"
                className="flex items-center gap-3 p-3 hover:bg-accent-bg rounded-lg transition-colors"
              >
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
                <span className="font-medium">Tailwind CSS Docs</span>
              </a>
            </li>
          </ul>
        </div>
        <div id="social" className="p-6 border border-border rounded-lg">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2 className="text-2xl font-semibold text-text-h mt-4 mb-2">
            Connect with us
          </h2>
          <p className="text-text mb-4">Join the Vite community</p>
          <ul className="grid grid-cols-2 gap-3">
            <li>
              <a
                href="https://github.com/vitejs/vite"
                target="_blank"
                className="flex items-center gap-3 p-3 hover:bg-social-bg rounded-lg transition-colors"
              >
                <svg
                  className="button-icon w-5 h-5"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="https://chat.vite.dev/"
                target="_blank"
                className="flex items-center gap-3 p-3 hover:bg-social-bg rounded-lg transition-colors"
              >
                <svg
                  className="button-icon w-5 h-5"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                <span>Discord</span>
              </a>
            </li>
            <li>
              <a
                href="https://x.com/vite_js"
                target="_blank"
                className="flex items-center gap-3 p-3 hover:bg-social-bg rounded-lg transition-colors"
              >
                <svg
                  className="button-icon w-5 h-5"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                <span>X.com</span>
              </a>
            </li>
            <li>
              <a
                href="https://bsky.app/profile/vite.dev"
                target="_blank"
                className="flex items-center gap-3 p-3 hover:bg-social-bg rounded-lg transition-colors"
              >
                <svg
                  className="button-icon w-5 h-5"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                <span>Bluesky</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
