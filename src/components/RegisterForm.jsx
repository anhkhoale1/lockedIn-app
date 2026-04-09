import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    telephone: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Telephone validation
    if (!formData.telephone) {
      newErrors.telephone = "Telephone is required";
    } else if (!/^[0-9+\-\s()]+$/.test(formData.telephone)) {
      newErrors.telephone = "Telephone number is invalid";
    }

    // First name validation
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }

    // Last name validation
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Prepare data for API (remove confirmPassword as it's not needed in the API)
      const { confirmPassword, ...apiData } = formData;

      try {
        // Call the API endpoint
        const response = await fetch("http://localhost:3000/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        });

        const data = await response.json();

        if (!response.ok) {
          // Handle API validation errors
          if (data.message && Array.isArray(data.message)) {
            const apiErrors = {};
            data.message.forEach((error) => {
              // Extract field name from error message
              if (error.includes("email")) apiErrors.email = error;
              else if (error.includes("password")) apiErrors.password = error;
              else if (error.includes("telephone")) apiErrors.telephone = error;
              else if (error.includes("firstName")) apiErrors.firstName = error;
              else if (error.includes("lastName")) apiErrors.lastName = error;
            });
            setErrors(apiErrors);
          } else if (data.message) {
            setErrors({ general: data.message });
          } else {
            setErrors({ general: "Registration failed. Please try again." });
          }
          return;
        }

        // Success
        setSuccessMessage(
          "Registration successful! Please check your email to verify your account.",
        );

        // Reset form
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          telephone: "",
          firstName: "",
          lastName: "",
        });

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (fetchError) {
        console.error("API fetch error:", fetchError);

        // Check if API is not available
        if (
          fetchError.message.includes("Failed to fetch") ||
          fetchError.message.includes("NetworkError")
        ) {
          // Mock successful response for demo purposes
          console.log("API not available, showing demo success message");
          setSuccessMessage(
            "Demo: Registration would be successful! (API endpoint: POST http://localhost:3000/users/register)",
          );

          // Show the data that would be sent to API
          console.log("Data that would be sent to API:", apiData);

          // Reset form
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
            telephone: "",
            firstName: "",
            lastName: "",
          });
        } else {
          setErrors({
            general:
              "Network error. Please check your connection and try again.",
          });
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-black">
            Or{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {errors.general}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="sr-only">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-black rounded-tl-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="First name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="sr-only">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-black rounded-tr-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

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
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="telephone" className="sr-only">
                Telephone
              </label>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                autoComplete="tel"
                required
                value={formData.telephone}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.telephone ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Telephone number"
              />
              {errors.telephone && (
                <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Password (min. 8 characters)"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } placeholder-gray-500 text-black rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isSubmitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-black">
          <p>
            By registering, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
