import { Box, Button, Typography, Rating, IconButton } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import AsNavFor from "../../../../shares/components/Slider/SliderAsNavFor";
import {
  StyledBoxContentContainer,
  StyledBoxContentDetails,
  StyledBoxRating,
  StyledBoxSlider,
  StyledButtonOrder,
  StyledContainer,
  StyledTextBtnBack,
  StyledTextView,
  StyledTitleRestaurant,
} from "./Restaurant.styles";
import DishesListOrder from "./DishesListOrder";
import useGetRestaurantDetails from "../../hooks/useGetRestaurantDetail";
import InfoCustomerForm from "./InfoCustomerForm";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useParams } from "react-router-dom";
import ReviewsRestaurantDetail from "./ReviewsRestaurantDetail";
import CustomModal from "../../../../shares/components/CustomModal";
import { useQueryClient } from "react-query";
import { RESTAURANT_DETAIL_QUERY_KEY } from "../../constant";

const RESTAURANTS_DISHES_LIST_DATA = [
  {
    _id: "1",
    name: "Phở",
    type: 0,
    images: "/images/dishes/pho.jpg",
    price: 80000,
    discount: 0,
  },

  {
    _id: "2",
    name: "Bún bò",
    type: 1,
    images: "/images/dishes/bunbo.jpg",
    price: 65000,
    discount: 0,
  },

  {
    _id: "3",
    name: "Lẩu Thái",
    type: 3,
    images: "/images/dishes/hotpot.webp",
    price: 300000,
    discount: 5,
  },
];

const IMAGES_LIST = [
  { image: "/images/restaurants/restaurant_1.webp" },
  { image: "/images/restaurants/restaurant_2.jpg" },
  { image: "/images/restaurants/restaurant_3.jpeg" },
  { image: "/images/restaurants/restaurant_4.jpg" },
  { image: "/images/restaurants/restaurant_5.webp" },
];

const RestaurantDetail = () => {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState();
  const [orderDishesData, setOrderDishesData] = useState([]);
  const [nextStep, setNextStep] = useState(false);
  const [isRefetch, setIsRefetch] = useState();
  const queryClient = useQueryClient();
  const onLick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setNextStep(false);
  };
  const { id: idRestaurant } = useParams();

  const navigate = useNavigate();

  const handleOnBack = () => {
    const to = -1;
    navigate(to);
  };

  const { restaurantDetailData, refetch } =
    useGetRestaurantDetails(idRestaurant);

  const {
    name,
    phoneNumber,
    address,
    images,
    avgRate,
    // type,
    // taste,
    reviews,
    description,
    timeStart,
    timeEnd,
  } = restaurantDetailData?.restaurant || {};

  useEffect(() => {
    if (isRefetch) {
      queryClient.invalidateQueries(RESTAURANT_DETAIL_QUERY_KEY, {
        refetchInactive: true,
      });
      refetch();
    }
  }, [isRefetch, refetch, queryClient]);

  const IMAGES_LIST_RESTAURANT = [
    ...(images || []).map((url) => {
      return { image: url };
    }),
    ...IMAGES_LIST,
  ];

  const listMenuRestaurant = useMemo(() => {
    if (restaurantDetailData?.menu?.length !== 0) {
      return restaurantDetailData?.menu;
    }

    return RESTAURANTS_DISHES_LIST_DATA;
  }, [restaurantDetailData]);
  console.log("listMenuRestaurant", listMenuRestaurant);
  return (
    <StyledContainer container>
      <CustomModal open={open} onClose={handleClose}>
        {!nextStep ? (
          <DishesListOrder
            data={listMenuRestaurant}
            cart={cart}
            setCart={setCart}
            setNextStep={setNextStep}
            setOrderDishesData={setOrderDishesData}
          />
        ) : (
          <InfoCustomerForm
            setNextStep={setNextStep}
            orderDishesData={orderDishesData}
            idRestaurant={idRestaurant}
            handleClose={handleClose}
          />
        )}
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseIcon />
        </IconButton>
      </CustomModal>

      <Box>
        <Button sx={{ color: "black" }}>
          <KeyboardArrowLeftIcon />{" "}
          <StyledTextBtnBack onClick={handleOnBack}>Trở về</StyledTextBtnBack>
        </Button>
      </Box>

      <StyledBoxContentContainer>
        <StyledBoxSlider>
          <AsNavFor imagesList={IMAGES_LIST_RESTAURANT} />
        </StyledBoxSlider>

        <StyledBoxContentDetails>
          <StyledTitleRestaurant>{name}</StyledTitleRestaurant>

          <StyledBoxRating>
            <Rating defaultValue={4} readOnly />
            <StyledTextView>{reviews} views</StyledTextView>
          </StyledBoxRating>

          <Box>
            <Typography
              sx={{ color: "#16171C", fontWeight: 700, fontSize: 16 }}
            >
              Địa chỉ:{" "}
              <span style={{ color: "#888B94", fontWeight: 500, fontSize: 15 }}>
                {address}
              </span>
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingTop: "16px",
            }}
          >
            <Typography
              sx={{ color: "#16171C", fontWeight: 700, fontSize: 16 }}
            >
              Số điện thoại:{" "}
              <span style={{ color: "#888B94", fontWeight: 500, fontSize: 15 }}>
                {phoneNumber}
              </span>
            </Typography>
            <Typography
              sx={{ color: "#16171C", fontWeight: 700, fontSize: 16 }}
            >
              Thời gian mở:{" "}
              <span style={{ color: "#888B94", fontWeight: 500, fontSize: 15 }}>
                {timeStart} - {timeEnd}
              </span>
            </Typography>
          </Box>

          <Typography
            py={2}
            sx={{
              color: "#888B94",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 1.5,
            }}
          >
            {description}
          </Typography>

          <StyledButtonOrder onClick={onLick}>Đặt bàn</StyledButtonOrder>
        </StyledBoxContentDetails>
      </StyledBoxContentContainer>
      <ReviewsRestaurantDetail
        idRestaurant={idRestaurant}
        reviews={reviews}
        avgRate={avgRate}
        setIsRefetch={setIsRefetch}
      />
    </StyledContainer>
  );
};

export default RestaurantDetail;
