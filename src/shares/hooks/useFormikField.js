import { useField } from "formik";

const useFormikField = (fieldName, notOverrideBlurEvent = true) => {
  const [field, meta, helpers] = useField(fieldName);
  const isError = meta.touched && meta.error;
  const errorMessage = meta.error;

  if (notOverrideBlurEvent && field.onBlur) {
    delete field.onBlur;
  }

  return { field, meta, isError, errorMessage, helpers };
};

export default useFormikField;
