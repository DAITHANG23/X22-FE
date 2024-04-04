import { Box, Button, Typography, Rating, Modal } from "@mui/material";
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
  const onLick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
            <DishesListOrder
              data={RESTAURANTS_DISHES_LIST_DATA}
              cart={cart}
              setCart={setCart}
            />
          </Box>
        </Fade>
      </Modal>
      <Box>
        <Button sx={{ color: "black" }}>
          <KeyboardArrowLeftIcon />{" "}
          <StyledTextBtnBack>Trở về</StyledTextBtnBack>
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

          <Typography py={2}>
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
