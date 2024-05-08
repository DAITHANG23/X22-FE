import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useMemo } from "react";
import * as Yup from "yup";
import FormTextField from "../../../../shares/components/CustomFormTextField";
import { Formik, Form } from "formik";
import { useStyles } from "../../../Dashboard/components/RestaurantDetail/Restaurant.styles";
import { startOfYesterday } from "date-fns";
import TextNumberPhone from "../../../../shares/components/TextNumberPhone";
import FormDateTimePicker from "../../../../shares/components/FormDateTimePicker";
import { REGEX_CHARACTER_VALIDATE_FOR_NAME } from "../../../Dashboard/constant";
import useOrderRestaurant from "../../../Dashboard/hooks/useOrderRestaurant";
import { useAppContext } from "../../../../context/AppContext";
import reservations from "../../../../api/reservations";
const InfoCustomerForm = ({
  disable,
  setNextStep,
  orderDishesData,
  idRestaurant,
  handleClose,
  setDataResponse,
}) => {
  const classes = useStyles();
  const { currentUser, token } = useAppContext();

  const { onUpdateOrderRestaurant } = useOrderRestaurant();

  let initialValues = {
    name: currentUser?.name || "",
    phoneNumber: currentUser?.phoneNumber || "",
  };

  const validationSchema = useMemo(() => {
    return Yup.object({
      name: Yup.string()
        .trim()
        .required("Vui lòng nhập thông tin này")
        .matches(
          REGEX_CHARACTER_VALIDATE_FOR_NAME,
          "Nhập tên không có kí tự đặc biệt"
        )
        .max(100, "Vui lòng không nhập quá 100 kí tự"),

      phoneNumber: Yup.string().trim().required("Vui lòng nhập thông tin này"),
      people: Yup.string().trim().required("Vui lòng nhập thông tin này"),

      time: Yup.string().trim().required("Vui lòng nhập thông tin này"),
    });
  }, []);

  const validate = (value) => {
    const error = {};

    if (value.people > 1000) {
      error.people = "Vui lòng không nhập quá 1000 khách";
    } else if (value.people < 1) {
      error.people = "Vui lòng nhập tối thiểu 1 khách";
    }

    return error;
  };

  const handleSubmit = async (formData) => {
    const params = { order: orderDishesData, ...formData, idRestaurant };

    onUpdateOrderRestaurant(params, () => {
      handleClose();
      setNextStep(false);
    });
    const tmp = await reservations.getEmployeeReservations(token);
    setDataResponse(tmp.data.reservations);
  };

  const handleOnBack = () => {
    setNextStep(false);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validate={validate}
    >
      {({ isValid }) => {
        return (
          <>
            <Box sx={{ paddingBottom: "8px", textAlign: "center" }}>
              <Typography sx={{ fontSize: 24, fontWeight: 500 }}>
                Nhập thông tin cho khách hàng
              </Typography>
            </Box>
            <Form
              style={{
                backgroundColor: "white",
                boxShadow: "0px -4px 16px 0px #0000000D",
                border: "none",
                maxWidth: "550px",
                margin: "0 auto",
              }}
              className={classes.form}
            >
              <Container sx={{ padding: "48px 0px 24px 0px" }}>
                <Grid item xs={12} md={6} sm={6} mt={3}>
                  <FormTextField
                    disable={disable}
                    required
                    name="name"
                    label={"Tên khách hàng"}
                    placeholder={"Nhập họ và tên"}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Grid>

                <Grid item xs={12} md={6} sm={6} mt={3}>
                  <TextNumberPhone
                    phoneNumberName={"phoneNumber"}
                    label={"Số điện thoại"}
                    required={true}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Grid>

                <Grid item xs={12} md={6} sm={6} mt={6}>
                  <FormTextField
                    disable={disable}
                    required
                    type="number"
                    name="people"
                    label={"Số lượng khách"}
                    placeholder={"Nhập số lượng khách"}
                    variant="outlined"
                    style={{ width: "100%" }}
                  />
                </Grid>
                <Grid item xs={12} md={6} sm={6} mt={6}>
                  <FormDateTimePicker
                    name="time"
                    label={"Thời gian"}
                    required
                    maxDate={startOfYesterday()}
                    width={"100%"}
                  />
                </Grid>
                <Box
                  sx={{
                    marginTop: "32px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={handleOnBack}
                    sx={{
                      backgroundColor: "#CED0D6",
                      color: "black",
                      textTransform: "none",
                      padding: "6px 30px",
                      fontSize: "16px",
                      fontWeight: 600,
                      opacity: 0.8,
                      "&:hover": {
                        backgroundColor: "#CED0D6",
                        opacity: 1,
                      },
                    }}
                  >
                    Trở về
                  </Button>

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
                    Hoàn thành
                  </Button>
                </Box>
              </Container>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default InfoCustomerForm;
