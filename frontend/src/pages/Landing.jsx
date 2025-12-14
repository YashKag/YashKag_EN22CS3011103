import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Landing() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    api.get("/plans/").then(res => setPlans(res.data));
  }, []);

  const handleViewTrainer = (trainerId) => {
    if (!token) {
      navigate("/login");
    } else {
      navigate(`/trainer/${trainerId}`);
    }
  };

  return (
    <div>
      {/* ================= HERO SECTION (ONLY WHEN LOGGED OUT) ================= */}
      {!token && (
        <div className="bg-gradient-to-r from-black to-gray-800 text-white py-24 px-8 text-center">
          <h1 className="text-5xl font-extrabold mb-4">
            FitPlanHub
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Discover expert trainers. Follow personalized fitness plans.
          </p>

          
        </div>
      )}

      {/* ================= PLANS SECTION ================= */}
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Available Fitness Plans
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div
              key={plan.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="font-bold text-xl">{plan.title}</h3>
              <p className="text-gray-600 mb-2">₹{plan.price}</p>

              {plan.description ? (
                <p className="text-gray-700">{plan.description}</p>
              ) : (
                <p className="italic text-gray-400">
                  Subscribe to unlock full details
                </p>
              )}

              <button
                onClick={() => handleViewTrainer(plan.trainer_id)}
                className="text-blue-600 underline mt-4 block"
              >
                View Trainer
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
