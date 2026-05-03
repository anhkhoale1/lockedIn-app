import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSession, setActiveIdentity } from "../api/session";

const IdentitySelection = () => {
  const navigate = useNavigate();
  const session = getSession();

  // Guard: if the user doesn't have both IDs they shouldn't be here — redirect away.
  useEffect(() => {
    if (!session?.ptId || !session?.trainerId) {
      navigate("/", { replace: true });
    }
  }, [session, navigate]);

  const handleChoice = (identity) => {
    setActiveIdentity(identity);
    if (identity === "trainer") {
      navigate("/trainer-dashboard");
    } else {
      navigate("/pt-dashboard");
    }
  };

  // Render nothing while the guard redirect fires.
  if (!session?.ptId || !session?.trainerId) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Choose Your Identity
        </h1>
        <p className="mt-2 text-center text-gray-600">
          You have both a Trainer and a Personal Trainer profile. Which would
          you like to use for this session?
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            type="button"
            onClick={() => handleChoice("trainer")}
            className="flex flex-col items-center justify-center py-10 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg shadow-sm transition-colors"
          >
            Continue as Trainer
          </button>

          <button
            type="button"
            onClick={() => handleChoice("pt")}
            className="flex flex-col items-center justify-center py-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-lg shadow-sm transition-colors"
          >
            Continue as Personal Trainer (PT)
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdentitySelection;
