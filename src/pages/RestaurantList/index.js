import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FilterRestaurant from "./components/filterRestaurant";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Box, CircularProgress, Rating, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, [page, limit]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3002/restaurant?page=${page}&limit=${limit}`
      );
      setRestaurants(response.data.data);
      setTotalPages(response.data.meta.totalPages);
      setTotalRecords(response.data.meta.totalRecords);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout to send search request after 4 seconds
    const timeoutId = setTimeout(() => {
      setLoading(true);
      // Send search request
      fetchSearchResults(newSearchTerm);
    }, 1000);

    setSearchTimeout(timeoutId);
  };

  const fetchSearchResults = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3002/restaurant?name=${query}&address=${query}`
      );
      if (response.data.data.length === 0) {
        setNoResults(true);
      } else {
        setRestaurants(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
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

  const handleClickOpenDiaglog = () => {
    setOpen(true);
  };

  const onClickRestaurantDetail = (idRestaurant) => {
    const to = `/restaurantdetail/${idRestaurant}`;
    navigate(to);
  };

  return (
    <div className="restaurant-list-container">
      <div className="restaurant-list">
        <FilterRestaurant
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <div className="restaurant-card">
          <div className="restaurant-card-items">
            <Typography
              variant="h4"
              sx={{ padding: "16px 0px", fontWeight: 700 }}
            >
              Danh sách nhà hàng: {totalRecords} kết quả{" "}
            </Typography>
            <ul>
              {loading && (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              )}
              {noResults && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <span>Không tìm thấy kết quả</span>
                </div>
              )}
              {restaurants.map((restaurant, index) => {
                console.log("restaurant:", restaurant);
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
                          <AccessTimeIcon />
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
                        <LocationOnIcon />
                        {restaurant.address}
                      </div>
                      <div className="detail-content flex phone-number">
                        <LocalPhoneIcon />
                        {restaurant.phoneNumber}
                      </div>
                      <Rating
                        defaultValue={restaurant.avgRate}
                        readOnly
                        sx={{ paddingTop: "16px" }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="paginator">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
