import React, { useEffect, useState } from "react";
import apiService from "../../api";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import "./styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login, isLogin } = useAppContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") && isLogin) {
      enqueueSnackbar("Bạn đã đăng nhập!", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        maxSnack: 1,
        timer: 1000,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = { email, password };
    apiService.login
      .login({ formData })
      .then((res) => {
        login(res.data.token);
        enqueueSnackbar("Đăng nhập thành công!", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          timer: 1000,
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Invalid email or password");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="login-container">
      {!isLogin && (
        <div>
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
              <input
                type="submit"
                value={isLoading ? "Logging in..." : "Login"}
                disabled={isLoading}
              />
            </div>
          </form>
          <div>
            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </div>
      )}
      {isLogin && (
        <h2 style={{ color: "red", margin: "0 auto" }}>Bạn đã đăng nhập!</h2>
      )}
    </div>
  );
};

export default Login;
