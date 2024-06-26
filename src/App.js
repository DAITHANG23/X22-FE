import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RestaurantDetail from "./pages/Dashboard/components/RestaurantDetail";
import RestaurantList from "./pages/RestaurantList";
import Reservations from "./pages/Reservations";
import Admin from "./pages/Admin";
import { useAppContext } from "./context/AppContext";
import TopRestaurants from "./pages/TopRestaurants";
import { Box } from "@mui/material";

function App() {
  const { role, refeshToken } = useAppContext();
  useEffect(() => {
    refeshToken();
  }, []);
  return (
    <div className="container">
      <Header />
      <Box sx={{ minHeight: "600px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<RestaurantList />} />
          <Route path="/restaurantdetail/:id" element={<RestaurantDetail />} />

          <Route path="/toprestaurants" element={<TopRestaurants />} />

          <Route path="/reservations" element={<Reservations />} />

          {(role === 1 || role === 0) && (
            <Route path="/admin/*" element={<Admin />} />
          )}

          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Box>

      <Footer />
    </div>
  );
}

export default App;
