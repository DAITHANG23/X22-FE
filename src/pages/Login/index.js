import React, { useState } from "react";
import apiService from "../../api";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = { email, password };
    console.log(email, password);
    apiService.login
      .login({ formData })
      .then((res) => {
        login(res.data.token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Invalid email or password");
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
        {/* Conditionally render error message */}
        <div className="form-group">
          <input type="submit" value="Login" />
        </div>
      </form>
      <div>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
