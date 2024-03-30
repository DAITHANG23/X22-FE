import React from "react";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import "./index.css";

const FilterRestaurant = ({ searchTerm, handleSearchChange }) => {
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
      </div>
    </div>
  );
};

export default FilterRestaurant;
