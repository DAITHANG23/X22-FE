import React from "react";
import { Chart } from "react-google-charts";
const Datbantheothang = () => {
  const data = [
    ["Tháng", "VNĐ (Tr)"],
    ["03/2024", 50],
    ["04/2024", 100],
    ["05/2024", 130],
    ["06/2024", 130],
    ["07/2024", 90],
    ["08/2024", 150],
  ];

  const options = {
    title: "Doanh thu (theo tháng)",
    curveType: "function",
    legend: { position: "bottom" },
  };

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default Datbantheothang;
