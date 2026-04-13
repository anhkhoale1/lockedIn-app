import { useState } from "react";
import { Link } from "react-router-dom";
import { clearSession, getSession } from "./api/session";

function App() {
  const [session, setSession] = useState(() => getSession());

  const isLoggedIn = Boolean(session?.email);
  const verificationLabel = session?.isVerified ? "Verified" : "Pending verification";

  const handleLogout = () => {
    clearSession();
    setSession(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Account Dashboard
        </h1>
        <p className="mt-2 text-center text-gray-600">
          Login, register, and track your email verification status.
        </p>

        {!isLoggedIn ? (
          <div className="mt-8 space-y-4">
            <div className="rounded-md bg-blue-50 text-blue-800 p-4 text-sm">
              You are not logged in.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                to="/login"
                className="text-center py-3 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
              >
                Go to Login
              </Link>
              <Link
                to="/register"
                className="text-center py-3 px-4 bg-green-600 text-white rounded-md font-medium hover:bg-green-700"
              >
                Create Account
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            <div className="rounded-md border border-gray-200 p-4">
              <p className="text-sm text-gray-500">Logged in as</p>
              <p className="text-lg font-semibold text-gray-900">{session.email}</p>
              {session.firstName || session.lastName ? (
                <p className="text-sm text-gray-600 mt-1">
                  {session.firstName} {session.lastName}
                </p>
              ) : null}
            </div>

            <div
              className={`rounded-md p-4 text-sm ${
                session.isVerified
                  ? "bg-green-50 text-green-700"
                  : "bg-yellow-50 text-yellow-800"
              }`}
            >
              Email verification status: <strong>{verificationLabel}</strong>
              {!session.isVerified ? (
                <p className="mt-2">
                  Please use the verification link sent to your email inbox.
                </p>
              ) : null}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleLogout}
                className="py-3 px-4 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-900"
              >
                Log out
              </button>
              {!session.isVerified ? (
                <Link
                  to="/verify-email"
                  className="text-center py-3 px-4 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700"
                >
                  Open Verification Page
                </Link>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
