import { Avatar, styled } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Slider from "react-slick";

export const useStyles = makeStyles(() => ({
  sliderContainer: {
    borderRadius: "16px",
  },
}));

export const StyledSlider = styled(Slider)(() => ({
  "& .slick-track .slick-slide": {
    paddingLeft: "4px",
    paddingRight: "4px",
    cursor: "pointer",
  },
}));

export const StyledAvatar = styled(Avatar)(({ isChoose, theme }) => ({
  width: "64px",
  height: "64px",
  borderRadius: "12px",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: isChoose ? 1 : 0.48,
  border: isChoose ? `2.5px solid ${theme.palette.error.main}` : "",
}));
