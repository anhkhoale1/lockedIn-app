import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/users";

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])(?=\S+$).{8,}$/;

const PASSWORD_RULE_MESSAGE =
  "Password must be at least 8 characters and include 1 uppercase letter, 1 number, 1 special character, and no spaces.";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return (params.get("token") || "").trim();
  }, [location.search]);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      setErrors({});
      setSuccessMessage("Password reset successful. Redirecting to login...");

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1200);
    },
    onError: (error) => {
      const payload = error?.data;
      const messageList = Array.isArray(payload?.message)
        ? payload.message.map((item) => String(item))
        : typeof payload?.message === "string"
          ? [payload.message]
          : [error?.message || "Unable to reset password. Please try again."];

      const nextErrors = {};

      messageList.forEach((message) => {
        const normalized = message.toLowerCase();

        if (
          normalized.includes("confirm password does not match") ||
          (normalized.includes("confirm") && normalized.includes("match"))
        ) {
          nextErrors.confirmPassword = "Confirm password does not match";
          return;
        }

        if (normalized.includes("token invalid")) {
          nextErrors.general = "Reset link is invalid.";
          return;
        }

        if (normalized.includes("token expires") || normalized.includes("expired")) {
          nextErrors.general = "Reset link has expired. Request a new one.";
          return;
        }

        if (normalized.includes("confirmpassword") || normalized.includes("confirm password")) {
          nextErrors.confirmPassword = message;
          return;
        }

        if (normalized.includes("newpassword") || normalized.includes("password")) {
          nextErrors.newPassword = message;
          return;
        }

        if (!nextErrors.general) {
          nextErrors.general = message;
        }
      });

      setErrors(nextErrors);
    },
  });

  const validate = () => {
    const nextErrors = {};

    if (!token) {
      nextErrors.general = "Reset link is invalid.";
    }

    if (!formData.newPassword) {
      nextErrors.newPassword = "New password is required";
    } else if (!PASSWORD_REGEX.test(formData.newPassword)) {
      nextErrors.newPassword = PASSWORD_RULE_MESSAGE;
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.newPassword) {
      nextErrors.confirmPassword = "Confirm password does not match";
    }

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resetPasswordMutation.isPending) return;

    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setSuccessMessage("");
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSuccessMessage("");
    resetPasswordMutation.mutate({
      token,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            Reset password
          </h2>
          <p className="mt-2 text-center text-sm text-black">
            Enter your new password below.
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
              <label htmlFor="newPassword" className="sr-only">
                New password
              </label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.newPassword}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, newPassword: e.target.value }));
                  if (errors.newPassword || errors.general) {
                    setErrors((prev) => ({ ...prev, newPassword: "", general: "" }));
                  }
                }}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="New password"
              />
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }));
                  if (errors.confirmPassword || errors.general) {
                    setErrors((prev) => ({ ...prev, confirmPassword: "", general: "" }));
                  }
                }}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-black rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          <p className="text-xs text-gray-600">{PASSWORD_RULE_MESSAGE}</p>

          <div>
            <button
              type="submit"
              disabled={resetPasswordMutation.isPending}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                resetPasswordMutation.isPending
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {resetPasswordMutation.isPending ? "Resetting password..." : "Reset password"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-black">
          Back to{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
