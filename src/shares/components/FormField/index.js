import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import React from "react";
import { useInputLabelStyles, useStyles } from "./styles";
import clsx from "clsx";

const FormField = ({
  label,
  labelShrinked = true,
  labelCapitalized = false,
  helperText,
  error,
  fullWidth,
  children,
  ...props
}) => {
  const inputLabelClasses = useInputLabelStyles(props);

  const classes = useStyles(props);

  return (
    <FormControl
      variant="outlined"
      {...props}
      error={error}
      sx={{
        width: "100%",

        "& .MuiOutlinedInput-root": {
          borderRadius: `8px !important`,
          borderColor: error ? "red !important" : "#888B94",
        },

        "& .MuiInputLabel-shrink": {
          marginLeft: "-14px",
          marginTop: "-4px",
          transform: "translate(14px, -20px) scale(1)",
        },

        "& .MuiOutlinedInput-root:hover:not(.Mui-disabled) .MuiOutlineInput-notchedOutline":
          {
            borderColor: "#888B94",
          },

        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "#888B94",
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
      }}
    >
      {label && (
        <InputLabel
          error={error}
          shrink={labelShrinked || undefined}
          sx={{
            color: `#888B94`,
            fontSize: "15px !important",
            lineHeight: "18px",
            fontWeight: "600 !important",
            textTransform: labelCapitalized ? "capitalize" : "unset",
            transform: "translate(14px, 12px) scale(1)",
          }}
        >
          {label}
        </InputLabel>
      )}

      {children}
      {helperText && (
        <FormHelperText sx={{ color: "red" }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default FormField;
