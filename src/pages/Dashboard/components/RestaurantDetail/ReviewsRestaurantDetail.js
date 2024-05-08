import {
  Avatar,
  Box,
  Button,
  Rating,
  Stack,
  Typography,
  TextField,
  IconButton,
  FormHelperText,
} from "@mui/material";
import * as Yup from "yup";
import CreateIcon from "@mui/icons-material/Create";
import React, { useEffect, useMemo, useState } from "react";
import { useStyles } from "./Restaurant.styles";
import CustomModal from "../../../../shares/components/CustomModal";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import { Form, Formik } from "formik";
import useReviewsRestaurant from "../../hooks/useReviewsRestaurant";
import useGetReviewsRestaurantDetail from "../../hooks/useGetReviewsRestaurantDetail";
import { useAppContext } from "../../../../context/AppContext";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const ReviewsRestaurantDetail = ({
  idRestaurant,
  reviews,
  avgRate,
  setIsRefetch,
}) => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const [hover, setHover] = useState(-1);

  const [open, setOpen] = useState(false);

  const { isLogin, currentUser } = useAppContext();

  const { mutate: postReviewRestaurant, isSuccess } = useReviewsRestaurant();

  const { reviewsRestaurantDetailData, refetch } =
    useGetReviewsRestaurantDetail(idRestaurant);

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {};

  const validationSchema = useMemo(() => {
    return Yup.object({
      ratings: Yup.string()
        .trim()
        .required("Điểm đánh giá phải lớn hơn hoặc bằng 1"),

      comment: Yup.string()
        .trim()
        .required("Vui lòng nhập bình luận đánh giá")
        .max(200, "Vui lòng nhập không quá 200 kí tự"),
    });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      handleClose();
      setValue(0);
      setIsRefetch(isSuccess);
    }
  }, [isSuccess, refetch, setIsRefetch]);

  const handleSubmit = (formData) => {
    const postOfDay = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    const params = {
      ...formData,
      userId: currentUser?._id,
      restaurantId: idRestaurant,
      createdAt: postOfDay,
    };
    postReviewRestaurant(params);
  };

  return (
    <Box
      sx={{
        width: "100%",
        border: "none",
        borderRadius: "16px",
        boxShadow:
          "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
        height: "100vh",
        marginTop: "100px",
        padding: "16px 0px",
        position: "relative",
        overflow: "scroll",
      }}
    >
      <CustomModal open={open} handleClose={handleClose}>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, errors, isValid }) => {
            return (
              <>
                {isLogin ? (
                  <Form>
                    <Box>
                      <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
                        Đánh giá nhà hàng
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        gap: "12px",
                        paddingTop: "32px",
                      }}
                    >
                      <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                        Điểm đánh giá của bạn về nhà hàng:
                      </Typography>
                      <Box
                        sx={{
                          width: 200,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Rating
                          name="ratings"
                          value={value}
                          precision={0.5}
                          getLabelText={getLabelText}
                          onChange={(event, newValue) => {
                            setValue(newValue);
                            setFieldValue("ratings", newValue);
                          }}
                          onChangeActive={(event, newHover) => {
                            setHover(newHover);
                          }}
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55 }}
                              fontSize="inherit"
                            />
                          }
                        />

                        {value !== null && (
                          <Box sx={{ ml: 2 }}>
                            {labels[hover !== -1 ? hover : value]}
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box>
                      <FormHelperText error={errors?.ratings}>
                        {errors?.ratings}
                      </FormHelperText>
                    </Box>
                    <TextField
                      label={"Đánh giá"}
                      name="comment"
                      id="outlined-multiline-static"
                      fullWidth
                      multiline
                      rows={3}
                      error={errors?.comment}
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "rgb(25, 118, 210)",
                          },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "rgb(25, 118, 210)",
                        },
                        marginTop: "32px",
                      }}
                      onChange={(e) => {
                        const { value } = e.target;
                        setFieldValue("comment", value);
                      }}
                      helperText={errors?.comment}
                    />

                    <Box sx={{ marginTop: "16px", textAlign: "end" }}>
                      <Button
                        sx={{
                          textTransform: "none",
                          borderRadius: "8px",
                          border: "1px solid #888B94",
                          color: "#16171C",
                          fontWeight: 700,
                          fontSize: "14px",
                          padding: "5px 12px",
                          "&:hover": {
                            border: "1px solid #16171C",
                            backgroundColor: "#DCDEE6",
                          },

                          marginRight: "16px",
                        }}
                        onClick={handleClose}
                      >
                        Hủy
                      </Button>
                      <Button
                        sx={{
                          textTransform: "none",
                          borderRadius: "8px",
                          border: "none",
                          color: "#FFF",
                          backgroundColor: !isValid ? "#CED0D6" : "#d02128",
                          fontWeight: 700,
                          fontSize: "14px",
                          padding: "5px 12px",
                          opacity: 0.8,
                          "&:hover": {
                            opacity: 1,
                            backgroundColor: "#d02128",
                          },
                        }}
                        type="submit"
                        disabled={!isValid}
                      >
                        Đăng
                      </Button>
                    </Box>
                  </Form>
                ) : (
                  <Box
                    sx={{
                      height: "336px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: "#DCDEE6",
                        width: "72px",
                        height: "72px",
                        textAlign: "center",
                        paddingTop: "23px",
                        fontSize: "20px",
                      }}
                    >
                      <LockOpenIcon sx={{ width: "30px", height: "30px" }} />
                    </Box>

                    <Typography>
                      Bạn vui lòng <Link to={"/login"}>đăng nhập</Link> để đánh
                      giá
                    </Typography>
                  </Box>
                )}
              </>
            );
          }}
        </Formik>

        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseIcon />
        </IconButton>
      </CustomModal>
      <Box
        sx={{
          paddingBottom: "16px",
          borderBottom: "1px dashed rgba(145, 158, 171, 0.2)",
        }}
      >
        <Typography
          sx={{ fontSize: "16px", fontWeight: 600, paddingLeft: "16px" }}
        >
          Reviews
        </Typography>
      </Box>

      <Stack
        width={"100%"}
        direction="row"
        sx={{
          borderBottom: "1px dashed rgba(145, 158, 171, 0.2)",
        }}
      >
        <Box
          width={"50%"}
          sx={{
            borderRight: "1px dashed rgba(145, 158, 171, 0.2)",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
            Điểm đánh giá trung bình{" "}
          </Typography>

          <Typography sx={{ fontSize: "48px", fontWeight: 800 }}>
            {Math.round(avgRate)}/5
          </Typography>

          <Rating defaultValue={4} readOnly />

          <Typography
            sx={{ fontSize: "14px", fontWeight: 400, color: "#888B94" }}
          >{`(${reviews || 0} reviews)`}</Typography>
        </Box>
        <Box
          width={"50%"}
          sx={{
            padding: "16px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              textTransform: "none",
              color: "#16171C",
              fontSize: "15px",
              fontWeight: 700,
              backgroundColor: "#CED0D6",
              opacity: 0.8,
              padding: "6px 16px",
              borderRadius: "8px",
              "&:hover": {
                opacity: 1,
                backgroundColor: "#CED0D6",
              },
            }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <CreateIcon sx={{ marginRight: "5px" }} /> Viết đánh giá của bạn
          </Button>
        </Box>
      </Stack>

      <Box>
        {reviewsRestaurantDetailData?.map((item) => (
          <>
            <Box
              sx={{
                display: "flex",
                paddingTop: "32px",
                marginBottom: "8px",
                paddingLeft: "32px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "240px",
                  textAlign: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <Avatar
                  src={"/images/avatar.jpg"}
                  sx={{ width: "64px", height: "64px" }}
                />
                <Box>
                  <Typography
                    sx={{
                      color: "#16171C",
                      fontSize: "14px",
                      fontWeight: 600,
                      paddingBottom: "5px",
                    }}
                  >
                    {item.user.name}
                  </Typography>
                  <Typography
                    sx={{ color: "#888B94", fontSize: "12px", fontWeight: 400 }}
                  >
                    {item?.createdAt}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Rating defaultValue={item?.ratings} readOnly />
                <Typography>{item?.comment}</Typography>
              </Box>
            </Box>
          </>
        ))}
      </Box>
    </Box>
  );
};

export default ReviewsRestaurantDetail;
