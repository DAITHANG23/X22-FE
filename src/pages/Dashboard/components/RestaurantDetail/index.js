import { Box, Button, Typography, Rating } from "@mui/material";
import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import AsNavFor from "../../../../shares/components/Slider/SliderAsNavFor";
import {
  StyledBoxContentContainer,
  StyledBoxContentDetails,
  StyledBoxRating,
  StyledBoxSlider,
  StyledContainer,
  StyledTextBtnBack,
  StyledTextView,
  StyledTitleRestaurant,
} from "./Restaurant.styles";

const IMAGES_LIST = [
  { image: "/images/restaurants/restaurant_1.webp" },
  { image: "/images/restaurants/restaurant_2.jpg" },
  { image: "/images/restaurants/restaurant_3.jpeg" },
  { image: "/images/restaurants/restaurant_4.jpg" },
  { image: "/images/restaurants/restaurant_5.webp" },
];

const RestaurantDetail = () => {
  return (
    <StyledContainer container>
      <Box>
        <Button sx={{ color: "black" }}>
          <KeyboardArrowLeftIcon /> <StyledTextBtnBack>Back</StyledTextBtnBack>
        </Button>
      </Box>

      <StyledBoxContentContainer>
        <StyledBoxSlider>
          <AsNavFor imagesList={IMAGES_LIST} />
        </StyledBoxSlider>

        <StyledBoxContentDetails>
          <StyledTitleRestaurant>Nhà hàng Bến xưa</StyledTitleRestaurant>

          <StyledBoxRating>
            <Rating />
            <StyledTextView>1.1k views</StyledTextView>
          </StyledBoxRating>

          <Typography py={12}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Typography>

          <Typography sx={{ paddingTop: "12px" }}></Typography>

          <Button
            sx={{
              borderRadius: "8px",
              padding: "8px 16px",
              width: "200px",
              textTransform: "none",
              marginTop: "15px",
              fontWeight: 600,
              fontSize: "16px",
              backgroundColor: "#d02128",
              opacity: 0.8,
              color: "#fff",
              "&:hover": {
                backgroundColor: "#d02128",
                opacity: 1,
              },
            }}
          >
            Đặt bàn
          </Button>
        </StyledBoxContentDetails>
      </StyledBoxContentContainer>
    </StyledContainer>
  );
};

export default RestaurantDetail;
