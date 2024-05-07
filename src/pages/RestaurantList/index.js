import React, { useEffect, useState } from "react";
import "./index.css";
import HomeIcon from "@mui/icons-material/Home";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import StarIcon from "@mui/icons-material/Star";
import FilterRestaurant from "./components/filterRestaurant";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import apiService from "../../api";
import ClipLoader from "react-spinners/ClipLoader";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [type, setType] = useState(""); // Add type state
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);

  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, [page, limit]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await apiService.restaurant.getListRestaurantData({
        page,
        limit,
      });
      setRestaurants(response.data.data);
      setTotalPages(response.data.meta.totalPages);
      setTotalRecords(response.data.meta.totalRecords);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFilters = async () => {
    try {
      setLoading(true);
      // Build query parameters for filtering
      const queryParams = {
        name: searchTerm,
        address: searchTerm,
        type,
        minPrice,
        maxPrice,
      };

      // Check if any filter criteria are provided
      const hasFilters = Object.values(queryParams).some(
        (value) => value !== ""
      );

      if (hasFilters) {
        const response = await apiService.restaurant.queryRestaurant(
          queryParams
        );
        console.log("response", response);
        if (response.data.data.length === 0) {
          setNoResults(true);
          // Reset total records when no results found
          setTotalRecords(0);
        } else {
          setNoResults(false);
          setRestaurants(response.data.data);
          setTotalPages(response.data.meta.totalPages);
          setTotalRecords(response.data.meta.totalRecords);
        }
      } else {
        // If no filters are applied, simply fetch all restaurants
        fetchRestaurants();
      }
    } catch (error) {
      console.error("Error fetching filtered results:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const formatPrice = (price) => {
    // Check if the price is not null or undefined
    if (price != null) {
      // Format the price using toLocaleString with Vietnamese locale
      return price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    } else {
      return "N/A"; // or any other default value for null/undefined price
    }
  };

  const onClickRestaurantDetail = (idRestaurant) => {
    const to = `/restaurantdetail/${idRestaurant}`;
    navigate(to);
  };

  // Define handleTypeChange function
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  // Define handleResetFilters function
  const handleResetFilters = async () => {
    try {
      // Reset all filter states
      setSearchTerm("");
      setType("");
      setMinPrice(0);
      setMaxPrice(1000000);

      // Send request with null parameters
      const response = await apiService.restaurant.getListRestaurantData({
        page,
        limit,
      });
      console.log("Reset Filters response", response);

      // Update state with the reset data
      setRestaurants(response.data.data);
      setTotalPages(response.data.meta.totalPages);
      setTotalRecords(response.data.meta.totalRecords);
      setNoResults(false); // Reset noResults flag
    } catch (error) {
      console.error("Error resetting filters:", error);
    }
  };

  return (
    <div className="restaurant-list-container">
      <div className="restaurant-list">
        <FilterRestaurant
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          type={type} // Pass type state
          handleTypeChange={handleTypeChange}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          handleSubmitFilters={handleSubmitFilters}
          handleResetFilters={handleResetFilters}
        />
        <div className="restaurant-card">
          <div className="restaurant-card-items">
            <h1>Danh sách nhà hàng: {totalRecords} kết quả </h1>
            {loading && (
              <Box
                sx={{
                  position: "absolute",
                  top: "500px",
                  left: "50%",
                }}
              >
                <ClipLoader color="#36d7b7" />
              </Box>
            )}
            {!noResults && (
              <ul>
                {restaurants.map((restaurant, index) => {
                  return (
                    <li key={restaurant._id}>
                      <img
                        className="image-restaurant"
                        src={restaurant.images[0]}
                        alt=""
                        onClick={() => onClickRestaurantDetail(restaurant._id)}
                        style={{ cursor: "pointer" }}
                      />
                      <div className="restaurant-detail">
                        <div className="detail-content-header flex">
                          <h3
                            className=" restaurant-name"
                            onClick={() =>
                              onClickRestaurantDetail(restaurant._id)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {restaurant.name}
                          </h3>
                          <div style={{ gap: "5px" }} className="flex">
                            Giờ hoạt động:
                            <div>
                              <span style={{ color: "green" }}>
                                {restaurant.timeStart}
                              </span>{" "}
                              -
                              <span style={{ color: "red" }}>
                                {restaurant.timeEnd}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="detail-content flex address">
                          <HomeIcon></HomeIcon>
                          {restaurant.address}
                        </div>
                        <div className="detail-content flex phone-number">
                          <LocalPhoneIcon></LocalPhoneIcon>{" "}
                          {restaurant.phoneNumber}
                        </div>

                        <hr className="divider" />
                        <div className="detail-content flex type-restaurant">
                          <div>
                            {restaurant.type === "vietnam" && "Món Việt"}
                            {restaurant.type === "china" && "Món Trung"}
                            {restaurant.type === "euro" && "Món Âu"}
                            {restaurant.type === "japan" && "Món Nhật"}
                            {restaurant.type === "korean" && "Món Hàn"}
                            {restaurant.type === "china" && "Món Trung"}
                          </div>
                          <div className="menu flex">
                            Điểm đánh giá:{" "}
                            <span>
                              <StarIcon style={{ color: "yellow" }}></StarIcon>
                              {restaurant.avgRate !== undefined
                                ? restaurant.avgRate.toFixed(1)
                                : "4"}
                            </span>
                          </div>

                          <div>
                            Giá chỉ từ: {formatPrice(restaurant.minPrice)} -{" "}
                            {formatPrice(restaurant.maxPrice)}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
            {noResults && !loading && (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <span>Không tìm thấy kết quả</span>
              </div>
            )}
            <div className="paginator">
              {totalRecords > 0 && totalPages > 1 && (
                <>
                  <button
                    className="btn-paginator"
                    onClick={handlePrevPage}
                    disabled={page === 1}
                  >
                    Previous
                  </button>
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <button
                    className="btn-paginator"
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                  >
                    Next
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
