import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import IdentitySelection from "./components/IdentitySelection";
import LoginForm from "./components/LoginForm";
import PtDashboard from "./components/PtDashboard";
import RegisterForm from "./components/RegisterForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import TrainerDashboard from "./components/TrainerDashboard";
import VerifyEmailForm from "./components/VerifyEmailForm";
import "./index.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordForm />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordForm />,
  },
  {
    path: "/users/reset-password",
    element: <ResetPasswordForm />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmailForm />,
  },
  {
    path: "/identity-selection",
    element: <IdentitySelection />,
  },
  {
    path: "/pt-dashboard",
    element: <PtDashboard />,
  },
  {
    path: "/trainer-dashboard",
    element: <TrainerDashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
