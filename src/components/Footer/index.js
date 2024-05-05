"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useMemo } from "react";
import useStyles, {
  StyledBoxContainer,
  StyledBoxFooterFirst,
  StyledTitle,
  StyledBoxFooterSecond,
  StyledBoxLinkContact,
  StyledLogoFooter,
} from "./Footer.styles";
import { Link, useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import FormTextField from "../../shares/components/CustomFormTextField";

const REGEX_VALIDATE_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Footer = () => {
  const classes = useStyles();

  const initialValues = {};

  const navigate = useNavigate();

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .trim()
        .required("Vui lòng nhập thông tin này")
        .matches(REGEX_VALIDATE_EMAIL, "Nhập email không đúng")
        .max(100, "Vui lòng không nhập quá 100 kí tự"),

      subject: Yup.string().trim().required("Vui lòng nhập thông tin này"),
      content: Yup.string().trim().required("Vui lòng nhập thông tin này"),
    });
  }, []);

  const handleSubmit = (formData) => {
    // const params = { order: orderDishesData, ...formData, idRestaurant };
    // onUpdateOrderRestaurant(params, () => {
    //   handleClose();
    //   setNextStep(false);
    // });
  };
  return (
    <StyledBoxContainer>
      <StyledBoxFooterFirst container>
        <Grid item>
          <StyledTitle>RESTAURANTS BOOKING</StyledTitle>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "start",
              gap: "5px",
              fontSize: "14px",
              color: "#FFF",
              paddingTop: "8px",
            }}
          >
            {" "}
            <LocationOnIcon />
            Số 1, Hà Nội
          </Typography>

          <Typography
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "start",
              gap: "5px",
              fontSize: "14px",
              color: "#FFF",
              paddingTop: "8px",
            }}
          >
            <CallIcon /> 0123456789
          </Typography>

          <Typography
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              textAlign: "start",
              gap: "5px",
              fontSize: "14px",
              color: "#FFF",
              paddingTop: "8px",
            }}
          >
            <EmailIcon /> booking-restaurants@test.com
          </Typography>
        </Grid>

        <Grid item width={"300px"}>
          <Typography
            sx={{
              paddingTop: "20px",
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            Liên hệ
          </Typography>
          <Formik
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            initialValues={initialValues}
          >
            {({ isValid }) => {
              return (
                <Form>
                  <Box mt={4}>
                    <FormTextField
                      required
                      name="email"
                      label={"Email"}
                      placeholder={"Nhập email"}
                      variant="outlined"
                      style={{
                        width: "100%",
                      }}
                      className={classes.formMail}
                    />
                  </Box>

                  <Box mt={4}>
                    <FormTextField
                      required
                      name="subject"
                      label={"Tiêu đề"}
                      placeholder={"Nhập tiêu đề"}
                      variant="outlined"
                      style={{
                        width: "100%",
                      }}
                      className={classes.formMail}
                    />
                  </Box>

                  <Box mt={4} mb={3}>
                    <FormTextField
                      required
                      name="content"
                      label={"Nội dung"}
                      placeholder={"Nhập nội dung của bạn"}
                      variant="outlined"
                      style={{
                        width: "100%",
                      }}
                      className={classes.formMail}
                      multiline
                    />
                  </Box>
                  <Box>
                    <Button
                      type="submit"
                      sx={{
                        backgroundColor: !isValid ? "#CED0D6" : "#15B138",
                        color: "#FFF",
                        textTransform: "none",
                        padding: "6px 30px",
                        fontSize: "16px",
                        fontWeight: 600,
                        opacity: 0.8,
                        "&:hover": {
                          backgroundColor: "#15B138",
                          opacity: 1,
                        },
                      }}
                      disabled={!isValid}
                    >
                      Gửi
                    </Button>
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Grid>

        <Grid item>
          <StyledTitle>Admin</StyledTitle>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
              flexDirection: "column",
              gap: "32px",
              textTransform: "none",
              marginTop: "16px",
            }}
          >
            <Button
              sx={{
                textTransform: "none",
                backgroundColor: "#CED0D6",
                color: "#16171C",
                padding: "8px 16px",
                fontWeight: 600,
                width: "200px",
                "&:hover": {
                  backgroundColor: "#888B94",
                },
              }}
              onClick={() => navigate(`/register`)}
            >
              Manager Register
            </Button>

            <Button
              sx={{
                textTransform: "none",
                backgroundColor: "#CED0D6",
                color: "#16171C",
                padding: "8px 16px",
                fontWeight: 600,
                width: "200px",
                "&:hover": {
                  backgroundColor: "#888B94",
                },
              }}
              onClick={() => navigate(`/login`)}
            >
              Manager Login
            </Button>
          </Box>
        </Grid>
      </StyledBoxFooterFirst>

      <StyledBoxFooterSecond>
        <Typography>Restaurants Booking App</Typography>

        <StyledLogoFooter
          src="/images/logo-restaurant.png"
          alt="logo"
          width={80}
          height={80}
        />
        <StyledBoxLinkContact>
          <Link href={"https://www.facebook.com"} target="_blank">
            <img
              src="/images/facebook.png"
              alt="facebook"
              width={36}
              height={36}
            />
          </Link>
          <Link href={"/"}>
            <img
              src="/images/instagram.png"
              alt="instagram"
              width={36}
              height={36}
            />
          </Link>
          <Link href={"https://www.youtube.com"} target="_blank">
            <img
              src="/images/youtube.png"
              alt="youtube"
              width={36}
              height={36}
            />
          </Link>

          <Link href={"/"}>
            <img
              src="/images/Linkedin.png"
              alt="Linkedin"
              width={36}
              height={36}
            />
          </Link>
        </StyledBoxLinkContact>
      </StyledBoxFooterSecond>
    </StyledBoxContainer>
  );
};

export default Footer;
