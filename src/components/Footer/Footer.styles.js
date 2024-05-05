import { styled, Box, Typography, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  formMail: {
    "& .MuiOutlinedInput-root": {
      backgroundColor: theme.palette.common.white,
    },
  },
}));

export default useStyles;

export const StyledBoxContainer = styled(Box)(() => ({
  marginTop: "300px",
  width: "100%",
}));

export const StyledBoxFooterFirst = styled(Grid)(({ theme }) => ({
  backgroundColor: "#2B2B39",
  color: theme.palette.background.paper,
  display: "flex",
  gap: "50px",
  padding: "50px",
  justifyContent: "space-around",
}));

export const StyledBoxContent = styled(Box)(() => ({
  width: "50%",
}));

export const StyledTitle = styled(Typography)(() => ({
  fontSize: "20px",
  fontWeight: "600",
  paddingTop: "20px",
}));

export const StyledTitleName = styled(Typography)(() => ({
  fontSize: "14px",
  fontStyle: "italic",
  paddingTop: "10px",
}));

export const StyledTitleNameGroup = styled(Typography)(() => ({
  fontSize: "18px",
  fontWeight: "700",
}));

export const StyledBoxLink = styled(Box)(() => ({
  display: "flex",
  gap: "6px",
  flexWrap: "wrap",
  marginTop: "15px",
}));

export const StyledLogoFooter = styled("img")(() => ({
  borderRadius: "1000px",
  border: "none",
  margin: "10px 0px",
}));

export const StyledBoxFooterSecond = styled(Box)(({ theme }) => ({
  backgroundColor: "#20202D",
  display: "flex",
  justifyContent: "space-around",
  textAlign: "center",
  alignItems: "center",
  color: theme.palette.background.paper,
}));

export const StyledBoxLinkContact = styled(Box)(() => ({
  display: "flex",
  gap: "10px",
}));
