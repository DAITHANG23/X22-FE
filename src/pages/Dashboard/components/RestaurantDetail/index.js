import {
  Box,
  Button,
  Typography,
  Rating,
  Modal,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import AsNavFor from "../../../../shares/components/Slider/SliderAsNavFor";
import PropTypes from "prop-types";
import { useSpring, animated } from "@react-spring/web";
import Backdrop from "@mui/material/Backdrop";
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
import { useNavigate } from "react-router-dom";

const RESTAURANTS_DISHES_LIST_DATA = [
  {
    id: "1",
    name: "Phở",
    type: 0,
    images: "/images/dishes/pho.jpg",
    price: 80000,
    discount: 0,
  },

  {
    id: "2",
    name: "Bún bò",
    type: 1,
    images: "/images/dishes/bunbo.jpg",
    price: 65000,
    discount: 0,
  },

  {
    id: "3",
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "8px",
  boxShadow: "0px 8px 24px 0px #2E34790A",
  p: 4,
};
const RestaurantDetail = () => {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState();
  const [orderDishesData, setOrderDishesData] = useState([]);
  const [nextStep, setNextStep] = useState(false);

  const onLick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleOnBack = () => {
    const to = `/`;
    navigate(to);
  };

  console.log("nextStep:", nextStep);
  const id = "6604306727fe5e635988056e";

  const { restaurantDetailData } = useGetRestaurantDetails(id);

  const {
    name,
    phoneNumber,
    address,
    images,
    // avgRate,
    // type,
    // taste,
    description,
    timeStart,
    timeEnd,
  } = restaurantDetailData || {};

  const IMAGES_LIST_RESTAURANT = [
    ...(images || []).map((url) => {
      return { image: url };
    }),
    ...IMAGES_LIST,
  ];

  return (
    <StyledContainer container>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {!nextStep ? (
              <DishesListOrder
                data={RESTAURANTS_DISHES_LIST_DATA}
                cart={cart}
                setCart={setCart}
                setNextStep={setNextStep}
                setOrderDishesData={setOrderDishesData}
              />
            ) : (
              <InfoCustomerForm
                setNextStep={setNextStep}
                orderDishesData={orderDishesData}
                idRestaurant={id}
                handleClose={handleClose}
              />
            )}
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", top: "10px", right: "10px" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Fade>
      </Modal>

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
            <Rating defaultValue={Math.round(4.9)} precision={0.1} readOnly />
            <StyledTextView>1.1k views</StyledTextView>
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

          <Typography sx={{ paddingTop: "12px" }}></Typography>

          <StyledButtonOrder onClick={onLick}>Đặt bàn</StyledButtonOrder>
        </StyledBoxContentDetails>
      </StyledBoxContentContainer>
    </StyledContainer>
  );
};

export default RestaurantDetail;

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};
