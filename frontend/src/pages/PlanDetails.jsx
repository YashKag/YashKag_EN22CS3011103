import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function PlanDetails() {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const loadPlan = async () => {
    const res = await api.get("/plans/");
    const found = res.data.find(p => p.id === Number(id));
    setPlan(found);
  };

  useEffect(() => {
    loadPlan();
  }, [id]);

  const subscribe = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }

    await api.post(`/subscribe/${id}`);
    alert("Subscribed successfully");
    loadPlan();
    };


  if (!plan) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{plan.title}</h1>
      <p className="text-gray-600">₹{plan.price}</p>

      {plan.description ? (
        <p className="mt-4">{plan.description}</p>
      ) : (
        <button
          onClick={subscribe}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Subscribe
        </button>
      )}

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
