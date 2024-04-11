import { FilledInput, Input, OutlinedInput } from "@mui/material";
import { createElement, forwardRef } from "react";
import useStyles from "./styles";

const InputComponent = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlinedInput,
};
const TextInput = forwardRef((props, ref) => {
  const classes = useStyles();
  const { variant, warning, ...rest } = props;
  return createElement(variant ? InputComponent[variant] : OutlinedInput, {
    ref,
    ...rest,
    classes,
  });
});

TextInput.defaultProps = {
  variant: "outlined",
};

export default TextInput;
