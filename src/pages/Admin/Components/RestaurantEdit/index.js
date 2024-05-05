import React from "react";
import "./styles.css";
import { useState } from "react";
import { useAppContext } from "../../../../context/AppContext";
import useGetRestaurantDetails from "../../../Dashboard/hooks/useGetRestaurantDetail.js";

const RestaurantEdit = () => {
  const { idRestaurant } = useAppContext();
  const { restaurantDetailData } = useGetRestaurantDetails(idRestaurant);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    images: [],
    type: 0,
    description: "",
    timeStart: "",
    timeEnd: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="RestaurantEditContainer">
      {!idRestaurant && (
        <div>
          <h1>Đăng kí nhà hàng</h1>
        </div>
      )}
      {idRestaurant && (
        <div>
          <h1>Chỉnh sửa thông tin nhà hàng nhà hàng</h1>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="formEditRestaurant">
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <div className="labelImage">
            {formData.images.map((image) => () => {
              <img src={image} alt="restaurant" />;
            })}
            <label>
              Images:
              <input
                type="file"
                name="images"
                value={formData.images}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <label>
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            TimeStart:
            <input
              type="text"
              name="timeStart"
              value={formData.timeStart}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            TimeEnd:
            <input
              type="text"
              name="timeEnd"
              value={formData.timeEnd}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Type:
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value={0}>--Select type--</option>
              <option value={1}>European</option>
              <option value={2}>Chinese</option>
              <option value={3}>Vietnamese</option>
              <option value={4}>Japanese</option>
              <option value={5}>Korean</option>
            </select>
          </label>
        </div>
        <button className="ButtonRestaurant" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RestaurantEdit;
