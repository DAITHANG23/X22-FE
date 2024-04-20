import React from "react";
import useGetRestaurantList from "./hooks/useGetRestaurantsList";

const Dashboard = () => {
  const { listRestaurantData } = useGetRestaurantList();

  return <div style={{ height: "100vh" }}>Dashboard</div>;
};

export default Dashboard;
