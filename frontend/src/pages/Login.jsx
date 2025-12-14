import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const res = await api.post("/auth/login", { email, password });
        login(res.data.access_token, res.data.role);

        if (res.data.role === "trainer") navigate("/trainer");
        else navigate("/feed");

    } catch (err) {
        if (err.response) {
        // Backend error (401, 400 etc)
        alert(err.response.data.detail || "Invalid credentials");
        } else {
        // Network / server down
        alert("Server not reachable. Try again later.");
        }
    }
    };


  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          className="input mb-3"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="input mb-3"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full py-2 rounded-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}
