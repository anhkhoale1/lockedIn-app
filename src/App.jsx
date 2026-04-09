import { useState } from "react";
import { Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="main-container">
        <section id="center" className="p-8">
          <div className="hero">
            <img
              src={heroImg}
              className="base"
              width="170"
              height="179"
              alt=""
            />
            <img src={reactLogo} className="framework" alt="React logo" />
            <img src={viteLogo} className="vite" alt="Vite logo" />
          </div>
          <div className="mt-8">
            <h1 className="text-4xl font-bold text-text-h mb-4">
              User Registration System
            </h1>
            <p className="text-lg text-text">
              This application integrates with the locked-in-user-api backend
            </p>
            <p className="mt-4 text-text">
              Use the navigation below to access login and registration pages
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
              Application Navigation
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/login"
                className="py-3 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
              >
                Login Page
              </Link>
              <Link
                to="/register"
                className="py-3 px-4 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
              >
                Register Page
              </Link>
            </div>
            <p className="text-text mt-4 text-sm">
              Click on the buttons above to navigate to the respective pages
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
              API Documentation
            </h2>
            <p className="text-text mb-4">Backend API endpoints</p>
            <ul className="space-y-3">
              <li>
                <div className="flex items-center gap-3 p-3 hover:bg-accent-bg rounded-lg transition-colors">
                  <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">
                    POST
                  </div>
                  <div>
                    <span className="font-medium">/users/register</span>
                    <p className="text-sm text-text">Register new user</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-3 p-3 hover:bg-accent-bg rounded-lg transition-colors">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                    GET
                  </div>
                  <div>
                    <span className="font-medium">/users/verify</span>
                    <p className="text-sm text-text">Verify user email</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div id="social" className="p-6 border border-border rounded-lg">
            <svg className="icon" role="presentation" aria-hidden="true">
              <use href="/icons.svg#social-icon"></use>
            </svg>
            <h2 className="text-2xl font-semibold text-text-h mt-4 mb-2">
              User Entity Fields
            </h2>
            <p className="text-text mb-4">Required fields for registration</p>
            <ul className="grid grid-cols-2 gap-3">
              <li className="p-3 bg-code-bg rounded">
                <span className="font-medium">email</span>
                <p className="text-sm text-text">Unique email address</p>
              </li>
              <li className="p-3 bg-code-bg rounded">
                <span className="font-medium">telephone</span>
                <p className="text-sm text-text">Unique phone number</p>
              </li>
              <li className="p-3 bg-code-bg rounded">
                <span className="font-medium">firstName</span>
                <p className="text-sm text-text">First name</p>
              </li>
              <li className="p-3 bg-code-bg rounded">
                <span className="font-medium">lastName</span>
                <p className="text-sm text-text">Last name</p>
              </li>
              <li className="p-3 bg-code-bg rounded">
                <span className="font-medium">password</span>
                <p className="text-sm text-text">Min. 8 characters</p>
              </li>
            </ul>
          </div>
        </section>

        <div className="ticks"></div>
        <section id="spacer"></section>
      </div>
    </>
  );
}

export default App;
