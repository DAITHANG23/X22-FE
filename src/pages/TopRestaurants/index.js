import React from "react";
import useGetTopRestaurants from "../../hooks/useGetTopRestaurants";
import { Box, Container, Grid, Rating, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CallIcon from "@mui/icons-material/Call";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ClipLoader from "react-spinners/ClipLoader";

const TopRestaurants = () => {
  const navigate = useNavigate();
  const { listRestaurantData, isLoading } = useGetTopRestaurants();

  const onClickRestaurantDetail = (idRestaurant) => {
    const to = `/restaurantdetail/${idRestaurant}`;
    navigate(to);
  };
  return (
    <Container style={{ marginTop: "150px", position: "relative" }}>
      <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
        Danh sách top 15 nhà hàng
      </Typography>

      {isLoading ? (
        <Box
          sx={{
            position: "absolute",
            top: "200px",
            left: "50%",
            paddingBottom: "1000px",
          }}
        >
          <ClipLoader color="#36d7b7" />
        </Box>
      ) : (
        <Grid container mt={5}>
          {listRestaurantData?.map((i) => {
            const {
              _id,
              address,
              avgRate,
              images,
              maxPrice,
              minPrice,
              name,
              phoneNumber,
              timeEnd,
              timeStart,
            } = i;
            return (
              <Grid
                md={4}
                sm={6}
                xs={12}
                sx={{
                  display: "flex",
                  transition: "all 0.3s",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                <Container
                  key={_id}
                  sx={{
                    backgroundColor: "#FFF",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0px -4px 16px 0px #0000000D",
                    height: "450px",
                    paddingTop: "16px",
                    paddingBottom: "16px",
                    margin: "16px",
                  }}
                  onClick={() => onClickRestaurantDetail(_id)}
                >
                  <Box
                    sx={{
                      width: "270px",
                      height: "185px",
                      margin: "0 auto",
                    }}
                  >
                    <img
                      src={`${images.toString()}`}
                      alt="restaurant"
                      width={"100%"}
                      height={"100%"}
                      style={{
                        borderRadius: "8px",
                      }}
                    />
                  </Box>

                  <Box sx={{ fontSize: "14px" }}>
                    <Typography
                      sx={{
                        fontSize: "18px !important",
                        fontWeight: 600,
                        textAlign: "center",
                        margin: "12px 0px",
                      }}
                    >
                      {name}
                    </Typography>
                    <Rating defaultValue={avgRate} readOnly />
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        textAlign: "start",
                        gap: "5px",
                        fontSize: "14px",
                        color: "#16171C",
                        paddingTop: "8px",
                      }}
                    >
                      <LocalAtmIcon />

                      {`${minPrice} VND - ${maxPrice} VND`}
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        textAlign: "start",
                        gap: "5px",
                        fontSize: "14px",
                        color: "#16171C",
                        paddingTop: "8px",
                      }}
                    >
                      <CallIcon /> {phoneNumber}
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        textAlign: "start",
                        gap: "5px",
                        fontSize: "14px",
                        color: "#16171C",
                        paddingTop: "8px",
                      }}
                    >
                      {" "}
                      <LocationOnIcon />
                      {address}
                    </Typography>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        textAlign: "start",
                        gap: "5px",
                        fontSize: "14px",
                        color: "#16171C",
                        paddingTop: "8px",
                      }}
                    >
                      <AccessTimeIcon /> {timeStart} - {timeEnd}
                    </Typography>
                  </Box>
                </Container>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default TopRestaurants;
