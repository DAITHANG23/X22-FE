import { TextField } from "@mui/material";
import clsx from "clsx";
import { useField, useFormikContext } from "formik";
import React from "react";
import useStyles from "./styles";

const FormTextField = ({
  children,
  variant,
  className,
  success,
  readOnly,
  ...props
}) => {
  const classes = useStyles();
  const [field, meta] = useField({ ...props });
  const isError = meta.touched && meta.error;
  const errorMessage = meta.error;

  const { setFieldValue } = useFormikContext();

  const handleChange = (e) => {
    let { value } = e.target;
    if (props.isNumber) {
      value = value.match(/\d+/g)?.join("");
    }
    if (props.uppercase) {
      value = (value || "").toUpperCase();
    }
    setFieldValue(props.name, value || "");
  };
  return (
    <TextField
      InputLabelProps={{ shrink: true }}
      className={clsx({
        [classes.root || ""]: true,
        [classes.outlined || ""]: variant === "outlined",
        [classes.basic || ""]: variant === "basic",
        [classes.success || ""]: success,
        [classes.readOnly || ""]: readOnly,
        [className || ""]: className,
      })}
      error={isError}
      {...field}
      {...props}
      onChange={props.onChange || handleChange}
      helperText={isError ? errorMessage : ""}
    />
  );
};

export default FormTextField;
