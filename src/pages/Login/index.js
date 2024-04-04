import React, { useState } from "react";
import { BoxFormGmail } from "./Login.styles"; // import the styled component
import apiService from "../../api";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      .catch((error) => console.log(error));
  };

  return (
    <BoxFormGmail onSubmit={handleSubmit}>
      {" "}
      {/* use the styled component here */}
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </BoxFormGmail>
  );
};

export default Login;
