import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "user"
  });
  const navigate = useNavigate();

  const submit = async () => {
    await api.post("/auth/signup", form);
    navigate("/login");
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>

        <input className="input mb-2" placeholder="Name"
          onChange={e => setForm({...form, name: e.target.value})} />
        <input className="input mb-2" placeholder="Email"
          onChange={e => setForm({...form, email: e.target.value})} />
        <input className="input mb-2" type="password" placeholder="Password"
          onChange={e => setForm({...form, password: e.target.value})} />

        <select
          className="input mb-4"
          onChange={e => setForm({...form, role: e.target.value})}
        >
          <option value="user">User</option>
          <option value="trainer">Trainer</option>
        </select>

        <button onClick={submit}
          className="bg-black text-white w-full py-2 rounded-lg">
          Create Account
        </button>
      </div>
    </div>
  );
}
