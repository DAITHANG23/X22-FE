import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useRegisterAccount from "./hooks/useRegisterAccount";
import "./styles.css";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import { REGEX_VALIDATE_EMAIL } from "../../components/Header/constant";
import FormTextField from "../../shares/components/CustomFormTextField";

function Register() {
  const [errorsRegister, setErrorsRegister] = useState("");
  const [role, setRole] = useState(2);
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onSuccess = () => {
    setRole(2);
    setTimeout(() => {
      Navigate("/login");
    }, 1000);
  };
  const { mutate, error, isLoading } = useRegisterAccount(onSuccess);

  const initialValues = {
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
    role: "",
  };

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .trim()
        .required("Vui lòng nhập thông tin này")
        .matches(REGEX_VALIDATE_EMAIL, "Nhập email không đúng"),
      password: Yup.string().trim().required("Vui lòng nhập thông tin này"),
      name: Yup.string().trim().required("Vui lòng nhập thông tin này"),
      phoneNumber: Yup.string().trim().required("Vui lòng nhập thông tin này"),
    });
  }, []);

  const handleSubmit = (formData) => {
    setErrorsRegister("");
    mutate({ ...formData, role });
  };

  useEffect(() => {
    if (error) setErrorsRegister(error?.response?.data?.message || "");
  }, [error]);

  return (
    <div style={{ marginTop: "200px" }}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ isValid, setFieldValue, errors }) => {
          const handleChangePassword = (e) => {
            const { value } = e.target;
            setFieldValue("password", value);
          };
          return (
            <Form
              style={{
                width: "480px",
                backgroundColor: "#FFF",
                boxShadow: "0px -4px 16px 0px #0000000D",
                padding: "64px",
                margin: "0 auto",
              }}
            >
              {errorsRegister && (
                <Alert severity="error" sx={{ marginBottom: "16px" }}>
                  {errorsRegister}
                </Alert>
              )}
              <h2 style={{ paddingBottom: "40px" }}>Đăng ký</h2>
              <Box sx={{ marginBottom: "32px" }}>
                <FormTextField
                  required
                  name="email"
                  label={"Email"}
                  placeholder={"Nhập email"}
                  variant="outlined"
                  style={{
                    width: "100%",
                    margin: "32px 0px",
                  }}
                />
              </Box>

              <Box sx={{ marginBottom: "32px" }}>
                <FormTextField
                  required
                  name="name"
                  label={"Họ và tên"}
                  placeholder={"Nhập họ và tên"}
                  variant="outlined"
                  style={{
                    width: "100%",
                    margin: "32px 0px",
                  }}
                />
              </Box>

              <Box sx={{ marginBottom: "32px" }}>
                <FormTextField
                  required
                  name="phoneNumber"
                  type="number"
                  label={"Số điện thoại"}
                  placeholder={"Nhập số điện thoại"}
                  variant="outlined"
                  style={{
                    width: "100%",
                    margin: "32px 0px",
                  }}
                />
              </Box>

              <FormControl
                sx={{
                  width: "100%",
                  "& .MuiInputBase-root > input": {
                    padding: "12px 14px",
                  },
                  "& .MuiInputBase-root > fieldset": {
                    borderRadius: "8px",
                  },
                }}
                variant="outline"
              >
                <InputLabel
                  shrink
                  htmlFor="password"
                  required
                  error={errors?.password}
                  sx={{
                    position: "absolute",
                    top: "-20px",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChangePassword}
                  error={errors?.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Nhập password"
                />
              </FormControl>
              {errors?.password && (
                <FormHelperText error={errors?.password}>
                  {errors?.password}
                </FormHelperText>
              )}
              <div style={{ marginTop: "32px" }}>
                <InputLabel
                  shrink
                  htmlFor="password"
                  required
                  sx={{
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  Vai trò
                </InputLabel>
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
              <div>
                <LoadingButton
                  loading={isLoading}
                  variant="outlined"
                  sx={{
                    width: "100%",
                    padding: "8px 16px",
                    color: "#FFF",
                    backgroundColor: !isValid ? "#CED0D6" : "#15B138",
                    borderRadius: "8px",
                    fontSize: "15px",
                    textTransform: "none",
                    marginTop: "16px",
                    marginBottom: "32px",
                    opacity: 0.8,
                    fontWeight: 700,
                    border: "none",
                    "&:hover": {
                      backgroundColor: "#15B138",
                      opacity: 1,
                      border: "none",
                    },
                  }}
                  disabled={!isValid}
                  type="submit"
                >
                  Đăng ký
                </LoadingButton>
              </div>

              <div>
                <p>
                  Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Register;
