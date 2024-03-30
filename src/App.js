import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import AppContextProvider from "./context/AppContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RestaurantDetail from "./pages/Dashboard/components/RestaurantDetail";

function App() {
  return (
    <AppContextProvider>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/restaurantdetail" element={<RestaurantDetail />} />

          <Route path="/*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </AppContextProvider>
  );
}

export default App;
