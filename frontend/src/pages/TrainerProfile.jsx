import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function TrainerProfile() {
  const { id } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/trainer/${id}`).then(res => setTrainer(res.data));
  }, [id]);

  const follow = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }

    await api.post(`/follow/${id}`);
    setMsg("Trainer followed");
    };


  if (!trainer) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{trainer.name}</h1>
      <p className="text-gray-600">{trainer.email}</p>

      <button
        onClick={follow}
        className="mt-4 bg-black text-white px-4 py-2 rounded"
      >
        Follow Trainer
      </button>

      {msg && <p className="mt-3 text-green-600">{msg}</p>}
      <h2 className="text-xl font-bold mt-6">Plans</h2>

        <div className="grid grid-cols-2 gap-4 mt-3">
        {trainer.plans.map(plan => (
            <div key={plan.id} className="border p-3 rounded">
            <h3 className="font-bold">{plan.title}</h3>
            <p>₹{plan.price}</p>
            </div>
        ))}
        </div>

    </div>
  );
}
