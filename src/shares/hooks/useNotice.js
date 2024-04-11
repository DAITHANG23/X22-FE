import { useSnackbar } from "notistack";
const useNotice = ({ variant, message }) => {
  const { enqueueSnackbar } = useSnackbar();

  return enqueueSnackbar(message, {
    variant,
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
  });
};

export default useNotice;
