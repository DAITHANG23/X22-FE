import { Button, Dialog, IconButton, Rating } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import {
  BoxComment,
  CommentField,
  Title,
  Content,
  DialogContainer,
} from "./dialogRateRestaurant.styles";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import axios from "axios";

const DialogRateRestaurant = ({ setOpen, open, restaurantId, userId }) => {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (restaurantId) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/restaurant/reviews",
        {
          userId: "65f86c38fc13ae6f31510898",
          restaurantId: restaurantId,
          ratings: value,
          comment: comment,
        }
      );

      console.log("Response:", response.data);
      setOpen(false);
      alert("Cảm ơn bạn đã đánh giá nhà hàng");
    } catch (error) {
      console.error("Error submitting rating:", error);
      // Handle error
    }
  };

  return (
    <div>
      <DialogContainer
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Title sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Đánh Giá Nhà Hàng Này
        </Title>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Content dividers>
          <BoxComment>
            <Rating
              name="size-large"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              sx={{ fontSize: "50px" }}
            />
          </BoxComment>
          <CommentField
            id="outlined-multiline-static"
            label="Hãy đánh giá nhà hàng của chúng tôi tại đây"
            multiline
            rows={4}
            sx={{
              width: "100%",
            }}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </Content>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Quay Lại
          </Button>
          <Button autoFocus onClick={() => handleSubmit(restaurantId)}>
            Gửi
          </Button>
        </DialogActions>
      </DialogContainer>
    </div>
  );
};

export default DialogRateRestaurant;
