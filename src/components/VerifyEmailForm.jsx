import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { verifyUser } from "../api/users";

const VerifyEmailForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    token: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (location.state?.email) {
      setFormData((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location.state]);

  const verifyMutation = useMutation({
    mutationFn: ({ email, token }) => verifyUser(email, token),
    onSuccess: () => {
      setErrorMessage("");
      setSuccessMessage("Email verified successfully. Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    },
    onError: (error) => {
      setSuccessMessage("");
      setErrorMessage(error?.message || "Verification failed. Please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    verifyMutation.mutate({
      email: formData.email,
      token: formData.token,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-black">
            Enter your verification token to activate your account
          </p>
          <p className="mt-2 text-center text-sm text-black">
            Or <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">go to login</Link>
          </p>
        </div>

        {errorMessage && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="rounded-md bg-green-50 p-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="token" className="sr-only">
                Verification token
              </label>
              <input
                id="token"
                name="token"
                type="text"
                required
                value={formData.token}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, token: e.target.value }))
                }
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Verification token"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={verifyMutation.isPending}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                verifyMutation.isPending
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              {verifyMutation.isPending ? "Verifying..." : "Verify email"}
            </button>
          </div>

          <div className="text-center text-sm text-black">
            <p>
              Need a new account?{" "}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
