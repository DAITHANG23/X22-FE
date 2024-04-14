import { Box, Button, Container, Typography, styled } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  form: {
    "& .MuiInputLabel-root.Mui-focused": {
      color: theme.palette.common.black,
    },

    boxSizing: "border-box",
    marginTop: theme.spacing(2),
    "& .MuiTextField-root": {
      marginTop: theme.spacing(2.5),
    },
    "& .TextField-none-margin": {
      "& .MuiFormLabel-root": {
        marginBottom: 2,
      },

      "& .MuiTextField-root": {
        marginTop: 0,
      },
    },

    "& .MuiFormHelperText-root": {
      color: theme.palette.error.main,
    },

    "& .MuiOutlinedInput-input:-webkit-autofill": {
      borderRadius: "inherit",
      backgroundColor: "transparent !important",
      "-webkit-box-shadow": "0 0 0 50px white inset",
    },
  },

  textFieldNumberPhone: {},

  divider: {
    transform: "scaleX(3)",
    borderStyle: "dashed !important ",
    borderColor: "rgba(145, 158, 171, 0.2)",
  },
}));

export const StyledContainer = styled(Container)(() => ({
  paddingTop: "130px",
  height: "auto",
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
  paddingBottom: "24px",
}));
export const StyledTextView = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[800],
  textAlign: "center",
  fontSize: "14px",
  marginTop: 5,
}));

export const StyledButtonOrder = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: theme.spacing(1, 2),
  width: "200px",
  textTransform: "none",
  marginTop: theme.spacing(2),
  fontWeight: 600,
  fontSize: "16px",
  backgroundColor: theme.palette.primary.main,
  opacity: 0.8,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    opacity: 1,
  },
}));
