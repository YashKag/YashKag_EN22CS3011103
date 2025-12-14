import { useEffect, useState } from "react";
import api from "../api/axios";

export default function TrainerDashboard() {
  const [plans, setPlans] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    duration_days: ""
  });

  // Load trainer plans
  const loadPlans = async () => {
    const res = await api.get("/plans/");
    setPlans(res.data);
  };

  // Load users under guidance (followers)
  const loadFollowers = async () => {
    try {
      // get current logged-in trainer
      const me = await api.get("/me");
      const trainerId = me.data.id;

      const res = await api.get(`/trainer/${trainerId}/followers`);
      setFollowers(res.data);
    } catch (err) {
      console.error("Failed to load followers");
    }
  };

  useEffect(() => {
    loadPlans();
    loadFollowers();
  }, []);

  // Create new plan
  const createPlan = async () => {
    if (!form.title || !form.price || !form.duration_days) {
      alert("Please fill all required fields");
      return;
    }

    await api.post("/plans/", {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      duration_days: Number(form.duration_days),
    });

    setForm({
      title: "",
      description: "",
      price: "",
      duration_days: ""
    });

    loadPlans();
  };

  return (
    <div className="p-8">
      {/* ================= TRAINER DASHBOARD HEADER ================= */}
      <h1 className="text-3xl font-bold mb-6">Trainer Dashboard</h1>

      {/* ================= CREATE PLAN SECTION ================= */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-bold mb-4">Create New Fitness Plan</h2>

        <input
          className="input mb-2"
          placeholder="Plan Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          className="input mb-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          className="input mb-2"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          className="input mb-4"
          placeholder="Duration (days)"
          type="number"
          value={form.duration_days}
          onChange={(e) => setForm({ ...form, duration_days: e.target.value })}
        />

        <button
          onClick={createPlan}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Create Plan
        </button>
      </div>

      {/* ================= TRAINER PLANS ================= */}
      <h2 className="text-2xl font-bold mb-4">Your Fitness Plans</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {plans.length === 0 ? (
          <p className="text-gray-500">No plans created yet</p>
        ) : (
          plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white p-4 rounded shadow"
            >
              <h3 className="font-bold text-lg">{plan.title}</h3>
              <p className="text-gray-600">₹{plan.price}</p>
              <p className="text-sm text-gray-500">
                Duration: {plan.duration_days} days
              </p>
            </div>
          ))
        )}
      </div>

      {/* ================= USERS UNDER GUIDANCE ================= */}
      <h2 className="text-2xl font-bold mt-8 mb-4">
        Users Under Your Guidance
      </h2>

      {followers.length === 0 ? (
        <p className="text-gray-500">No users following you yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {followers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 shadow rounded"
            >
              <h3 className="font-bold">{user.name}</h3>
              <p className="text-gray-500">{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
