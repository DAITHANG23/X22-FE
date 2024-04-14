import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CallMadeIcon from "@mui/icons-material/CallMade";
import FilterRestaurant from "./components/filterRestaurant";
import DialogRateRestaurant from "./components/dialogRateRestaurant";
import Button from "@mui/material/Button";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
      <div className="restaurant-list-header flex">
        <h1>Top Nhà Hàng Nổi Bật nhất</h1>
      </div>
      <div className="restaurant-list">
        <FilterRestaurant
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        <div className="restaurant-card">
          <div className="restaurant-card-items">
            <h1>Danh sách nhà hàng: {totalRecords} kết quả </h1>
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
                            <span style={{ color: "green" }}>09:00 AM</span> -
                            <span style={{ color: "red" }}>10:00 PM</span>
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
                        <div>Kiểu Âu, Kiểu Á</div>
                        <div className="menu flex">
                          <MenuBookIcon></MenuBookIcon> Thực đơn
                          <CallMadeIcon></CallMadeIcon>
                        </div>

                        {/* CLICK TO OPEN DIALOG */}
                        <React.Fragment>
                          <Button
                            variant="outlined"
                            onClick={handleClickOpenDiaglog}
                          >
                            Đánh giá nhà hàng
                          </Button>

                          <DialogRateRestaurant
                            setOpen={setOpen}
                            open={open}
                            restaurantId={restaurant.id}
                          ></DialogRateRestaurant>
                        </React.Fragment>
                      </div>
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
