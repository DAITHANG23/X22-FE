import {
  Dialog,
  TextField,
  DialogTitle,
  styled,
  DialogContentText,
} from "@mui/material";

export const DialogContainer = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "35%",
  },
}));

export const Content = styled(DialogContentText)(({ theme }) => ({
  padding: "10px 20px",
}));

export const Title = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: "red",
  color: "#fff",
}));

export const BoxComment = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  margin: "10px 0",
}));

export const CommentField = styled(TextField)(({ theme }) => ({}));
