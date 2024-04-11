import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "15px !important",
    lineHeight: "20px",
    marginBottom: 4,
    display: "block",
    fontWeight: "600 !important",
    color: theme.palette.grey[800],
    width: "100%",
    "& .MuiInputBase-input": {
      padding: "10px 12px",
    },
    "& .MuiInputBase-input.Mui-disabled": {
      cursor: "not-allowed",
    },
    "& .MuiFormHelperText-container": {
      margin: 0,
    },
  },
  basic: {
    "& .MuiOutLineInput-root": {
      marginTop: 16,
    },

    "& .MuiInputLabel-root": {
      margin: 0,
      marginLeft: 5,
      zIndex: "unset",
    },

    "& .MuiInputLabel-outlined": {
      transform: "translate(0px, 20px) scale(1)",
    },

    "& .MuiInputLabel-shrink": {
      marginLeft: 5,
      marginTop: 0,
      transform: "translate(0px, 0px) scale(1)",
    },

    "& fieldset": {
      border: "none",
    },

    "& .MuiInputBase-input": {
      border: "none",
      padding: "10px 5px",
    },

    "& .MuiOutlinedInput-adornedStart": {
      paddingLeft: 0,
    },

    "& .MuiOutLineInput-adornedEnd": {
      paddingRight: 0,
    },

    "& .MuiInputBase-inputAdornedStart": {
      paddingLeft: 5,
    },

    "& .MuiInputBase-inputAdornedEnd": {
      paddingRight: 5,
    },
  },

  outlined: {
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.spacing(1),
      width: "100%",
    },
    "& .MuiInputLabel-root": {
      transform: "translate(14px, 10px) scale(1)",
      lineHeight: "24px",
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
  },

  success: {
    "& .MuiFormHelperText-root": {
      color: theme.palette.success.main,
    },
  },

  readOnly: {
    "& .MuiInputBase-root": {
      backgroundColor: theme.palette.grey[500],
    },

    "& fieldset": {
      borderColor: theme.palette.grey[500],
    },
  },
}));

export default useStyles;
