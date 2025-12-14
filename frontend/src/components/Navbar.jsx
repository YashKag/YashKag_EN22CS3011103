import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  // ✅ single source of truth
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload(); // ensures clean UI
  };

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black text-white">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        FitPlanHub
      </h1>

      {/* 🔓 NOT LOGGED IN */}
      {!token ? (
        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="border px-4 py-2 rounded"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-black px-4 py-2 rounded"
          >
            Sign Up
          </button>
        </div>
      ) : (
        /* 🔐 LOGGED IN */
        <div className="flex items-center space-x-4">
          <div className="bg-gray-700 px-4 py-2 rounded-full">
            {role === "trainer" ? "Trainer" : "User"}
          </div>

          <button
            onClick={logout}
            className="text-red-400 underline"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
