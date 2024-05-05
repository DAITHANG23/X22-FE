import React from "react";
import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
//
import "./styles.css";
import axiosWrapper from "../../../../utils/axios";
import accountApi from "../../../../api/account";
import { useAppContext } from "../../../../context/AppContext";
import useRegisterAccount from "../../../Register/hooks/useRegisterAccount";
//
const Employee = () => {
  const { idRestaurant } = useAppContext();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [role, setRole] = useState(1);
  const [dataResponse, setDataResponse] = useState([]);
  const { token, refeshToken } = useAppContext();
  const onSuccess = () => {
    setEmail("");
    setName("");
    setPhoneNumber("");
    setPassword("");
    <Alert severity="success">Đăng ký thành công</Alert>;
    getEmployee();
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
      idRestaurant,
    };
    mutate(formData);
  };

  const handleDelete = async (id) => {
    localStorage.setItem("token", token);
    axiosWrapper.defaults.headers["Authorization"] = `Bearer ${token}`;
    await accountApi.deleteEmployee(id);
    await getEmployee();
  };

  useEffect(() => {
    if (error) setErrors(error?.response?.data?.message || "");
  }, [error]);
  const getEmployee = async () => {
    localStorage.setItem("token", token);
    refeshToken();
    axiosWrapper.defaults.headers["Authorization"] = `Bearer ${token}`;
    const tmp = await accountApi.getEmployee();
    console.log(tmp);
    setDataResponse(tmp);
  };
  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <div className="EmplyeeContainer">
      <div className="signUpEmplyee">
        <h2>Đăng ký tài khoản nhân viên</h2>
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
            <div className="radio-group" id="radioAdmin">
              <label>
                <input
                  type="radio"
                  name="role"
                  id="roleAdmin"
                  value={0}
                  checked={role === 0}
                  onChange={(e) => setRole(Number(e.target.value))}
                />
                <label htmlFor="roleAdmin">Quản lý</label>
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  id="roleEmpoyee"
                  value={1}
                  checked={role === 1}
                  onChange={(e) => setRole(Number(e.target.value))}
                />
                <label htmlFor="roleEmpoyee">Nhân viên</label>
              </label>
            </div>
          </div>
          <div className="form-group form-submit">
            <input type="submit" value="Đăng ký" />
          </div>
        </form>
      </div>
      <div className="line"></div>
      <h2>Danh sách tài khoản nhân viên</h2>
      <div className="listEmployee">
        {dataResponse.length === 0 && <p>Không có nhân viên nào</p>}
        {dataResponse.map((item) => (
          <div key={item._id} className="employeedetail">
            <p>Email: {item.email}</p>
            <p>Họ và tên: {item.name}</p>
            <p>Số điện thoại: {item.phoneNumber}</p>
            {item.role === 1 && (
              <div className="Buttondetail">
                <button onClick={() => handleDelete(item._id)}>
                  Xóa tài khoản
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employee;
