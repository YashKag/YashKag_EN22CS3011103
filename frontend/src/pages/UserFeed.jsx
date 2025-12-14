import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function UserFeed() {
  const [trainers, setTrainers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/trainers").then(res => setTrainers(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Discover Trainers</h1>

      {/* 🔁 SCROLLABLE TRAINER LIST */}
      <div className="flex space-x-4 overflow-x-auto pb-4 mb-8">
        {trainers.map(trainer => (
          <div
            key={trainer.id}
            className="min-w-[250px] bg-white shadow rounded p-4 cursor-pointer"
            onClick={() => navigate(`/trainer/${trainer.id}`)}
          >
            <h2 className="font-bold text-lg">{trainer.name}</h2>
            <p className="text-gray-500">{trainer.email}</p>
            <p className="mt-2 text-blue-600 underline">
              View Plans
            </p>
          </div>
        ))}
      </div>

      <p className="text-gray-500">
        Follow trainers to personalize your feed
      </p>
    </div>
  );
}
