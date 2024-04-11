import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles((theme) => ({
  root: ({ width, fullWidth }) => ({
    width: fullWidth ? "" : width,
    "& .MuiOutlinedInput-root": {
      borderRadius: `${theme.spacing(1)} !important`,
    },
    "& .MuiInputLabel-root": {
      transform: "translate(14px, 10px) scale(1) ",
      lineHeight: "24px !important",
    },

    "& .MuiInputLabel-shrink": {
      marginLeft: -13,
      marginTop: -4,
      transform: "translate(14px, -20px) scale(1)",
    },

    "& .MuiOutlinedInput-root:hover:not(.Mui-disabled) .MuiOutlineInput-notchedOutline":
      {
        borderColor: theme.palette.grey[800],
      },

    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.grey[800],
    },

    "& legend": {
      backgroundColor: "transparent",
      color: "transparent",
      width: 0,
    },

    "& .MuiOutlinedInput-adornedStart": {
      paddingLeft: 5,
    },

    "& .MuiOutLineInput-adornedEnd": {
      paddingRight: 5,
    },

    "& .MuiInputBase-inputAdornedStart": {
      paddingLeft: 5,
    },

    "& .MuiInputBase-inputAdornedEnd": {
      paddingRight: 5,
    },
  }),
}));

export const useInputLabelStyles = makeStyles((theme) => ({
  root: ({ labelCapitalized }) => ({
    color: `${theme.palette.grey[800]} !important`,
    fontSize: "15px !important",
    lineHeight: "18px",
    fontWeight: "600 !important",
    textTransform: labelCapitalized ? "capitalize" : "unset",
  }),
}));
