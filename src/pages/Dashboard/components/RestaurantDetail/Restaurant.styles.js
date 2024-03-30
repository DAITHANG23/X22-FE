import { Box, Container, Typography, styled } from "@mui/material";

export const StyledContainer = styled(Container)(() => ({
  paddingTop: "130px",
  height: "100vh",
}));

export const StyledTextBtnBack = styled("span")(() => ({
  fontWeight: 600,
  fontSize: "14px",
  textTransform: "none",
}));

export const StyledBoxContentContainer = styled(Box)(() => ({
  display: "flex",
  gap: "50px",
  paddingTop: "30px",
  height: "100%",
}));

export const StyledBoxSlider = styled(Box)(() => ({
  width: "40%",
  height: "500px",
}));

export const StyledBoxContentDetails = styled(Box)(() => ({
  width: "60%",
}));

export const StyledTitleRestaurant = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: 700,
}));

export const StyledBoxRating = styled(Box)(() => ({
  paddingTop: "12px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
}));
export const StyledTextView = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[800],
  textAlign: "center",
  fontSize: "14px",
  marginTop: 5,
}));
