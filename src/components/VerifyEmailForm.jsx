import React, { useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { markSessionVerified } from "../api/session";
import { verifyUser } from "../api/users";

const VerifyEmailForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [infoMessage, _setInfoMessage] = useState(() => {
    if (location.state?.email) {
      return `Verification email sent to ${location.state.email}. Please click the link in your inbox.`;
    }
    if (location.state?.info) {
      return location.state.info;
    }
    return "";
  });

  const { email, token } = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return {
      email: (searchParams.get("email") || "").trim(),
      token: (searchParams.get("token") || "").trim(),
    };
  }, [location.search]);

  const verifyMutation = useMutation({
    mutationFn: verifyUser,
    onSuccess: (_, variables) => {
      setErrorMessage("");
      setSuccessMessage("Email verified successfully. Redirecting...");
      markSessionVerified(variables?.email);

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1200);
    },
    onError: (error) => {
      setSuccessMessage("");
      setErrorMessage(error?.message || "Verification failed. Please try again.");
    },
  });

  useEffect(() => {
    if (!email || !token) return;

    verifyMutation.mutate({ email, token });
  }, [email, token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-black">
            Use the verification link sent to your inbox to activate your account.
          </p>
          <p className="mt-2 text-center text-sm text-black">
            Or{" "}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              go to login
            </Link>
          </p>
        </div>

        {infoMessage && (
          <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-700">
            {infoMessage}
          </div>
        )}

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

        {!email || !token ? (
          <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
            Invalid verification link. Open the full link from your email.
          </div>
        ) : (
          <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-700 text-center">
            {verifyMutation.isPending
              ? "Verifying your email..."
              : "Verification request sent."}
          </div>
        )}

        <div className="text-center text-sm text-black">
          <p>
            Need a new account?{" "}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
