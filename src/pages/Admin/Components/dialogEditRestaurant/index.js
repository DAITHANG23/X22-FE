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
} from "../dialogCreateRestaurant/dialogCreateRestaurant.styles";
import apiService from "../../../../api";
import { CircularProgress } from "@mui/material";

const DialogEditRestaurant = ({ open, handleClose, idRestaurant }) => {
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        setLoading(true);
        const restaurantId = idRestaurant;
        const response = await apiService.restaurant.getRestaurantDetail({
          restaurantId,
        });
        console.log(response);
        console.log(images);

        // Update state with fetched data
        setName(response.name);
        setTimeStart(response.timeStart);
        setTimeEnd(response.timeEnd);
        setPhoneNumber(response.phoneNumber);
        setAddress(response.address);
        setMinPrice(response.minPrice);
        setMaxPrice(response.maxPrice);
        setType(response.type);
        setDescription(response.description);
        setImages(response.images);
        setPreviewImages(images.map((image) => image));
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
        // Handle error
      } finally {
        setLoading(false);
      }
    };

    if (open && idRestaurant) {
      fetchRestaurantDetails();
    }
  }, [open, idRestaurant]);

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [name, setName] = useState("");
  const [timeStart, setTimeStart] = useState("");
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
  const [deletedImageIndexes, setDeletedImageIndexes] = useState([]);

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

  const handleEdit = async () => {
    try {
      setLoading(true);
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

      // Check if new images are selected
      // Check if new images are selected
      if (images.length > 0) {
        // If new images are selected, append them to the form data
        images.forEach((image) => {
          formData.append("images", image);
        });
      } else {
        // If no new images are selected, append the existing images from state
        images.forEach((image) => {
          formData.append("existingImages", image); // Use a different key for existing images
        });
      }

      formData.append("description", description);
      formData.append("minPrice", minPrice);
      formData.append("maxPrice", maxPrice);
      formData.append("type", type);

      const response = await apiService.restaurant.editRestaurant({
        idRestaurant,
        formData,
      });

      console.log(response.data);
      setShowAlert(true);

      setTimeout(() => {
        handleClose();
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error editing restaurant:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = Array.from(files);

    // Create an array to hold the URLs of the preview images
    const updatedPreviewImages = [];

    // Loop through the newly selected images
    imagesArray.forEach((image) => {
      // Create a local URL for each image
      const imageUrl = URL.createObjectURL(image);
      // Add the URL to the array of preview images
      updatedPreviewImages.push(imageUrl);
    });

    // Update the state with the newly created URLs
    setPreviewImages((prevPreviewImages) => [
      ...prevPreviewImages,
      ...updatedPreviewImages,
    ]);

    // Update the state with the newly selected images
    setImages((prevImages) => [...prevImages, ...imagesArray]);
  };

  const removePreviewImage = (index) => {
    // Add the index of the image to be deleted to the deletedImageIndexes state
    setDeletedImageIndexes([...deletedImageIndexes, index]);

    // Filter out the image at the specified index from the images state
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    // Filter out the preview image at the specified index from the previewImages state
    const updatedPreviewImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(updatedPreviewImages);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Edit Restaurant
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
          label="Restaurant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InfoContainer>
          <TextField
            fullWidth
            margin="normal"
            label="Opening Time"
            value={timeStart}
            onChange={(e) => setTimeStart(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Closing Time"
            value={timeEnd}
            onChange={(e) => setTimeEnd(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </InfoContainer>
        <InfoContainer>
          <TextField
            fullWidth
            margin="normal"
            label="Minimum Price (VNĐ)"
            value={`${minPrice}`}
            onChange={(e) => setMinPrice(e.target.value.replace(/\D/g, ""))}
            required
            style={{ width: "35%" }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Maximum Price (VNĐ)"
            value={`${maxPrice}`}
            onChange={(e) => setMaxPrice(e.target.value.replace(/\D/g, ""))}
            required
            style={{ width: "35%" }}
          />
          <TextField
            select
            fullWidth
            margin="normal"
            label="Restaurant Type"
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
          label="Address"
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
          style={{ display: "none" }}
          required
        />

        <InputBrowse htmlFor="image-input" className="custom-file-upload">
          Add Images for Restaurant Here
        </InputBrowse>

        <ImagePreviewContainer>
          {images.length > 0 && (
            <div>
              {images.length} file{images.length !== 1 ? "s" : ""} selected
            </div>
          )}
          {images.map((previewImage, index) => (
            <div
              key={index}
              style={{
                display: "inline-block",
                margin: "0 20px 5px 0", // Add margin to create a gap between images
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
                  top: " -15%",
                  right: " -29%",
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
          label="Restaurant Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleEdit}
          variant="contained"
          color="primary"
          disabled={!isFormValid()}
        >
          Update
        </Button>
      </DialogActions>
      {showAlert && (
        <div
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px",
            textAlign: "center",
          }}
        >
          Updated Successfully
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

export default DialogEditRestaurant;
