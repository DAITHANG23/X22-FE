import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {
  InfoContainer,
  InputBrowse,
  ImagePreviewContainer,
} from "./dialogCreateRestaurant.styles";
import apiService from "../../../../api";
import { CircularProgress } from "@mui/material";

const DialogCreateRestaurant = ({ open, handleClose, idRestaurant }) => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [name, setName] = useState("");
  const [timeStart, setTimeStart] = useState("09:00");
  const [timeEnd, setTimeEnd] = useState("22:00");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [minPrice, setMinPrice] = useState("100000");
  const [maxPrice, setMaxPrice] = useState("500000");
  const [type, setType] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  // Function to check if all required fields are filled
  const isFormValid = () => {
    return (
      name !== "" &&
      timeStart !== "" &&
      timeEnd !== "" &&
      phoneNumber !== "" &&
      address !== "" &&
      minPrice !== "" &&
      maxPrice !== "" &&
      type !== ""
    );
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // Validate required fields
      if (!isFormValid()) {
        setError("Please fill in all required fields.");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("timeStart", timeStart);
      formData.append("timeEnd", timeEnd);
      formData.append("phoneNumber", phoneNumber);
      formData.append("address", address);
      images.forEach((image) => {
        formData.append("images", image);
      });
      formData.append("description", description);
      formData.append("minPrice", minPrice);
      formData.append("maxPrice", maxPrice);
      formData.append("type", type);

      const response = await apiService.restaurant.createRestaurant(formData);

      // Handle response
      console.log(response.data);
      // Send formData to the server...
      setShowAlert(true);

      // Reset form fields after successful submission
      setName("");
      setTimeStart("09:00");
      setTimeEnd("22:00");
      setPhoneNumber("");
      setAddress("");
      setMinPrice("100000");
      setMaxPrice("500000");
      setType("");
      setImages([]);
      setPreviewImages([]);
      setDescription("");
      setError(null);
      setTimeout(() => {
        handleClose();

        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error creating restaurant:", error);
      // Handle error
    } finally {
      // Set loading state to false when request completes (whether success or error)
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = Array.from(files);
    setImages(imagesArray);

    const previewImagesArray = imagesArray.map((image) =>
      URL.createObjectURL(image)
    );
    setPreviewImages(previewImagesArray);
  };

  const removePreviewImage = (index) => {
    const updatedPreviewImages = [...previewImages];
    updatedPreviewImages.splice(index, 1);
    setPreviewImages(updatedPreviewImages);

    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    // Clear the file input value to update the displayed file count
    const fileInput = document.getElementById("image-input");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Thêm nhà hàng mới
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Tên nhà hàng"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InfoContainer>
          <TextField
            fullWidth
            margin="normal"
            label="Giờ mở cửa"
            value={timeStart}
            onChange={(e) => setTimeStart(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Giờ đóng cửa"
            value={timeEnd}
            onChange={(e) => setTimeEnd(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </InfoContainer>
        <InfoContainer>
          <TextField
            fullWidth
            margin="normal"
            label="Giá Nhỏ Nhất(VNĐ)"
            value={`${minPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
            onChange={(e) => setMinPrice(e.target.value.replace(/\D/g, ""))}
            required
            style={{ width: "35%" }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Giá Lớn Nhất(VNĐ)"
            value={`${maxPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
            onChange={(e) => setMaxPrice(e.target.value.replace(/\D/g, ""))}
            required
            style={{ width: "35%" }}
          />
          <TextField
            select
            fullWidth
            margin="normal"
            label="Kiểu Nhà Hàng"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            style={{ width: "30%" }}
          >
            {[
              { value: "euro", label: "Món Âu" },
              { value: "china", label: "Món Trung" },
              { value: "vietnam", label: "Món Việt" },
              { value: "japan", label: "Món Nhật" },
              { value: "korean", label: "Món Hàn" },
            ].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </InfoContainer>
        <TextField
          fullWidth
          margin="normal"
          label="Địa chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ marginBottom: "25px" }}
          required
        />
        <input
          id="image-input"
          type="file"
          multiple
          onChange={handleImageChange}
          style={{ display: "none" }} // Hide the default file input
          required
        />

        <InputBrowse htmlFor="image-input" className="custom-file-upload">
          Thêm ảnh cho nhà hàng tại đây
        </InputBrowse>

        <ImagePreviewContainer>
          {images.length > 0 && (
            <div>
              {images.length} file{images.length !== 1 ? "s" : ""} selected
            </div>
          )}

          {previewImages.map((previewImage, index) => (
            <div
              key={index}
              style={{
                display: "inline-block",
                margin: "5px",
                position: "relative",
              }}
            >
              <img
                src={previewImage}
                alt={`Preview ${index}`}
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
              <IconButton
                style={{
                  position: "absolute",
                  top: "-10%",
                }}
                onClick={() => removePreviewImage(index)}
              >
                <CloseIcon />
              </IconButton>
            </div>
          ))}
        </ImagePreviewContainer>
        <TextField
          fullWidth
          margin="normal"
          label="Mô tả nhà hàng"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!isFormValid()} // Disable button if form is not valid
        >
          Thêm
        </Button>
      </DialogActions>
      {/* Alert message */}
      {showAlert && (
        <div
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px",
            textAlign: "center",
          }}
        >
          Create Successfully
        </div>
      )}
      {loading && (
        <div
          style={{ display: "flex", justifyContent: "center", margin: "20px" }}
        >
          <CircularProgress />
        </div>
      )}
    </Dialog>
  );
};

export default DialogCreateRestaurant;
