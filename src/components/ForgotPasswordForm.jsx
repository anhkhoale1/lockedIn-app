import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { forgotPassword } from "../api/users";

const GENERIC_SUCCESS_MESSAGE =
  "If this email exists, a reset link has been sent.";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setErrors({});
      setSuccessMessage(GENERIC_SUCCESS_MESSAGE);
    },
    onError: (error) => {
      if (error?.status === 404) {
        setErrors({});
        setSuccessMessage(GENERIC_SUCCESS_MESSAGE);
        return;
      }

      const payload = error?.data;
      if (Array.isArray(payload?.message)) {
        const emailError = payload.message.find((item) =>
          String(item).toLowerCase().includes("email"),
        );

        if (emailError) {
          setErrors({ email: String(emailError) });
          return;
        }
      }

      if (typeof payload?.message === "string") {
        setErrors({ general: payload.message });
        return;
      }

      setErrors({
        general:
          error?.message ||
          "Unable to process your request right now. Please try again.",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (forgotPasswordMutation.isPending) return;

    const nextErrors = {};
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      nextErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(normalizedEmail)) {
      nextErrors.email = "Email is invalid";
    }

    if (Object.keys(nextErrors).length > 0) {
      setSuccessMessage("");
      setErrors(nextErrors);
      return;
    }

    setSuccessMessage("");
    setErrors({});
    forgotPasswordMutation.mutate(normalizedEmail);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            Forgot password
          </h2>
          <p className="mt-2 text-center text-sm text-black">
            Enter your email and we will send a password reset link.
          </p>
        </div>

        {errors.general && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
            {errors.general}
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
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email || errors.general) {
                    setErrors({});
                  }
                }}
                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={forgotPasswordMutation.isPending}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                forgotPasswordMutation.isPending
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {forgotPasswordMutation.isPending
                ? "Sending reset link..."
                : "Send reset link"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-black">
          Remembered your password?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
