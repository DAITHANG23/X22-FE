import React, { useEffect, useMemo, useState } from "react";
import apiService from "../../api";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import "./styles.css";
import { Form, Formik } from "formik";
import FormTextField from "../../shares/components/CustomFormTextField";
import {
  Box,
  FormControl,
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

const Login = () => {
  const { login, isLogin, role } = useAppContext();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValues = {};

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .trim()
        .required("Vui lòng nhập thông tin này")
        .matches(REGEX_VALIDATE_EMAIL, "Nhập email không đúng"),
      password: Yup.string().trim().required("Vui lòng nhập thông tin này"),
    });
  }, []);

  const handleSubmit = (formData) => {
    setIsLoading(true);
    apiService.login
      .login({ formData })
      .then((res) => {
        console.log(res);
        login(res.data.token, res.data.role);
        enqueueSnackbar("Đăng nhập thành công!", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          timer: 1000,
        });

        setTimeout(() => {
          if (res.data.role === 0 || res.data.role === 1) navigate("/admin");
          else navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Vui lòng đăng nhập lại.", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          timer: 1000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token") && isLogin) {
      setTimeout(() => {
        if (role === 0 || role === 1) navigate("/admin");
        else navigate("/");
      }, 1000);
    }
  }, [isLogin, navigate, role]);

  return (
    <div style={{ marginTop: "200px" }}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ isValid, setFieldValue }) => {
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
              <h2 style={{ paddingBottom: "40px" }}>Đăng nhập</h2>
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
                    marginTop: "32px",
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
                  Đăng nhập
                </LoadingButton>
              </div>
              <div>
                <p>
                  Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
                </p>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
