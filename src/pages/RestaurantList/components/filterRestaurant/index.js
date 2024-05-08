import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem"; // Add this import
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import "./index.css";

const FilterRestaurant = ({
  searchTerm,
  handleSearchChange,
  type,
  setType,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  handleSubmitFilters,
  handleTypeChange,
  handleResetFilters,
}) => {
  return (
    <div className="filter-container">
      <div className="filter">
        <h1>
          Bộ Lọc <FilterAltIcon />
        </h1>
        <div className="search-label">
          Tìm kiếm nhà hàng theo tên và địa điểm
        </div>
        <TextField
          className="search-field"
          label="Tìm tên nhà hàng và khu vực"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <SearchIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
            ),
          }}
        />

        <TextField
          fullWidth
          className="type-field"
          select
          label="Chọn loại nhà hàng"
          value={type}
          onChange={handleTypeChange}
          variant="outlined"
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="euro">Kiểu Âu</MenuItem>
          <MenuItem value="china">Kiểu Trung</MenuItem>
          <MenuItem value="vietnam">Kiểu Việt</MenuItem>
          <MenuItem value="japan">Kiểu Nhật</MenuItem>
          <MenuItem value="korean">Kiểu Hàn</MenuItem>
        </TextField>

        <div className="checkbox-filter">
          <h2>Chọn khoảng giá:</h2>
          <div className="checkbox-wrapper">
            <input
              type="radio"
              checked={minPrice === 0 && maxPrice === 100000}
              onChange={() => {
                if (minPrice !== 0 || maxPrice !== 100000) {
                  setMinPrice(0);
                  setMaxPrice(100000);
                } else {
                  setMinPrice("");
                  setMaxPrice("");
                }
              }}
            />
            <label htmlFor="0-100">0đ - 100,000đ</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="radio"
              checked={minPrice === 100000 && maxPrice === 500000}
              onChange={() => {
                if (minPrice !== 100000 || maxPrice !== 500000) {
                  setMinPrice(100000);
                  setMaxPrice(500000);
                } else {
                  setMinPrice("");
                  setMaxPrice("");
                }
              }}
            />
            <label htmlFor="100-500">100,000đ - 500,000đ</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="radio"
              checked={minPrice === 500000 && maxPrice === 1000000}
              onChange={() => {
                if (minPrice !== 500000 || maxPrice !== 1000000) {
                  setMinPrice(500000);
                  setMaxPrice(1000000);
                } else {
                  setMinPrice("");
                  setMaxPrice("");
                }
              }}
            />
            <label htmlFor="500-1000">500,000đ - 1 triệu Vnđ</label>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="radio"
              checked={minPrice > 1000000}
              onChange={() => {
                if (minPrice <= 1000000 || maxPrice !== "") {
                  setMinPrice(1001000);
                  setMaxPrice("");
                } else {
                  setMinPrice("");
                  setMaxPrice("");
                }
              }}
            />
            <label htmlFor="1000">Lớn hơn 1 triệu</label>
          </div>
        </div>

        <div className="actions">
          <button onClick={handleResetFilters}>Mặc định</button>
          <button className="apply-filter" onClick={handleSubmitFilters}>
            Tìm Kiếm
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterRestaurant;
