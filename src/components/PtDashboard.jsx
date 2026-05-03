// placeholder for Round 4 — full PT dashboard implemented in APP#7
import { useNavigate, Link } from "react-router-dom";
import { clearSession } from "../api/session";

const PtDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Welcome PT
        </h1>
        <p className="mt-4 text-center text-gray-600">
          Your full dashboard is coming in a future update.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="text-center py-3 px-6 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
          >
            Back to Home
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="py-3 px-6 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-900"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default PtDashboard;
