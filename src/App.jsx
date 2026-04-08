import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

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
        <button
          className="counter mt-8 px-6 py-3 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
        <div className="mt-8 p-6 border border-border rounded-lg bg-social-bg">
          <h2 className="text-2xl font-semibold text-text-h mb-4">
            Tailwind CSS Classes Demo
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="px-4 py-2 bg-blue-500 text-white rounded">
              bg-blue-500
            </div>
            <div className="px-4 py-2 bg-green-500 text-white rounded">
              bg-green-500
            </div>
            <div className="px-4 py-2 bg-red-500 text-white rounded">
              bg-red-500
            </div>
            <div className="px-4 py-2 bg-yellow-500 text-black rounded">
              bg-yellow-500
            </div>
            <div className="px-4 py-2 bg-purple-500 text-white rounded">
              bg-purple-500
            </div>
          </div>
          <p className="mt-4 text-sm text-text">
            These colored boxes demonstrate Tailwind's utility classes.
          </p>
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
