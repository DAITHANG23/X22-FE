import { MuiTelInput } from "mui-tel-input";
import React, { useState } from "react";
import useStyles from "./styles";
import clsx from "clsx";
import { FormLabel } from "@mui/material";
import useFormikField from "../../hooks/useFormikField";
import { useFormikContext } from "formik";

const TextNumberPhone = ({
  phoneNumberName,
  label,
  required = "false",
  variant,
  success,
  readOnly,
  className,
  ...props
}) => {
  const phoneFormikProps = useFormikField(phoneNumberName, false);
  const isError = phoneFormikProps.isError;
  const helperText = phoneFormikProps.errorMessage;
  const helpers = phoneFormikProps.helpers;
  const initialValue = phoneFormikProps.meta.value;
  const classes = useStyles();

  const [phone, setPhone] = useState(initialValue || "");
  const { setFieldValue } = useFormikContext();
  const handleChangeNumberPhone = (newPhone) => {
    setPhone(newPhone);
    setFieldValue(phoneNumberName, newPhone?.match(/\d+/g)?.join("") || "");
  };

  const onClick = () => {
    const { setTouched } = helpers;
    setTouched(phoneNumberName);
  };
  return (
    <div>
      {label !== "" && (
        <FormLabel
          required={required}
          error={isError}
          classes={{ root: classes.root }}
        >
          {label}
        </FormLabel>
      )}
      <MuiTelInput
        className={clsx({
          [classes.root || ""]: true,
          [classes.outlined || ""]: variant === "outlined",
          [classes.basic || ""]: variant === "basic",
          [classes.success || ""]: success,
          [classes.readOnly || ""]: readOnly,
          [className || ""]: className,
        })}
        onChange={handleChangeNumberPhone}
        error={isError}
        defaultCountry="VN"
        helperText={helperText}
        classes={{ TextField: classes.textFieldNumberPhone }}
        onClick={onClick}
        value={phone}
        {...props}
      />
    </div>
  );
};

export default TextNumberPhone;
