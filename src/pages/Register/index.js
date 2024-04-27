import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useRegisterAccount from "./hooks/useRegisterAccount";
import "./styles.css";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [role, setRole] = useState(2);
  const Navigate = useNavigate();
  const onSuccess = () => {
    setEmail("");
    setName("");
    setPhoneNumber("");
    setPassword("");
    setRole(2);
    setTimeout(() => {
      Navigate("/login");
    }, 3000);
  };
  const { mutate, error } = useRegisterAccount(onSuccess);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors("");
    const formData = {
      email,
      name,
      phoneNumber,
      password,
      role,
    };
    console.log(formData);
    mutate(formData);
  };

  useEffect(() => {
    if (error) setErrors(error?.response?.data?.message || "");
  }, [error]);

  return (
    <div className="signup-container">
      <h2>Đăng ký</h2>
      {errors && <Alert severity="error">{errors}</Alert>}
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
            className={errors.email && "error"}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="name">Họ và tên:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={errors.name && "error"}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Số điện thoại:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className={errors.phoneNumber && "error"}
          />
          {errors.phoneNumber && (
            <p className="error-message">{errors.phoneNumber}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={errors.password && "error"}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        <div className="form-group">
          <label>Vai trò:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="role"
                value={0}
                checked={role === 0}
                onChange={(e) => setRole(Number(e.target.value))}
              />
              Admin
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value={2}
                checked={role === 2}
                onChange={(e) => setRole(Number(e.target.value))}
              />
              User
            </label>
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Đăng ký" />
        </div>
      </form>
      <div>
        <p>
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
