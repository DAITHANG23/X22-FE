import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import AppContextProvider from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </div>
    </AppContextProvider>
  );
}

export default App;
