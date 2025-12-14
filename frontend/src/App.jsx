import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TrainerDashboard from "./pages/TrainerDashboard";
import UserFeed from "./pages/UserFeed";
import TrainerProfile from "./pages/TrainerProfile";



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/trainer" element={<TrainerDashboard />} />
          <Route path="/feed" element={<UserFeed />} />
          <Route path="/trainer/:id" element={<TrainerProfile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
