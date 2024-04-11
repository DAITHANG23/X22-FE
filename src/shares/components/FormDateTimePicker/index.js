import React, { useCallback, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import useFormikField from "../../hooks/useFormikField";
import FormField from "../FormField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextInput from "../TextInput";
import { endOfDay } from "date-fns";

const FormDateTimePicker = (props) => {
  const {
    name,
    inputFormat = "dd MMM yyyy",
    required = "false",
    label,
    labelCapitalized,
    labelShrinked,
    disabled,
    minDate,
    maxDate,
    onError,
    onChange,
    defaultValue,
    disableCalendarPicker,
    width,
    className,
    ...rest
  } = props;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const dateTimePickerFormikProps = useFormikField(name, false);
  const isError = dateTimePickerFormikProps.isError;
  const helperText = dateTimePickerFormikProps.errorMessage;
  const helpers = dateTimePickerFormikProps.helpers;

  const onClick = () => {
    const { setTouched } = helpers;
    setTouched(name);
  };

  const handleDateChange = useCallback(
    (date, keyboardInputValue, e) => {
      const { setValue, setTouched } = helpers;
      setTouched(name);
      setValue(date ? endOfDay(new Date(date)) : null);
      setInternalValue(date);

      if (!onChange) return;

      if (!keyboardInputValue) {
        onChange({ target: { name: name || "", value: date } });
      }

      onChange({ target: { name: name || "", value: null } });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onChange, name]
  );

  const renderInput = useCallback(
    (params) => {
      const {
        InputProps,
        inputProps,
        inputRef,
        disabled: inputDisabled,
        error: inputError,
      } = params;

      return (
        <TextInput
          {...inputProps}
          ref={inputRef}
          endAdornment={
            disabled || disableCalendarPicker ? null : InputProps?.endAdornment
          }
          disabled={inputDisabled}
          error={inputError || isError}
          {...rest}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabled, disableCalendarPicker]
  );

  return (
    <FormField
      label={label}
      labelCapitalized={labelCapitalized}
      labelShrinked={labelShrinked}
      helperText={helperText}
      required={required}
      disabled={disabled}
      error={isError}
      className={className}
      onClick={onClick}
      width={width}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          value={internalValue}
          name={name}
          inputFormat={inputFormat}
          renderInput={renderInput}
          onChange={handleDateChange}
          error={isError}
        />
      </LocalizationProvider>
    </FormField>
  );
};

export default FormDateTimePicker;
