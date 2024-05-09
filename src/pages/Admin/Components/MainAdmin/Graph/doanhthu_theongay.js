import React from "react";
import { Chart } from "react-google-charts";
const Doanhthutheongay = () => {
  const data = [
    ["Ngày", "VNĐ (Tr)"],
    ["31/03", 50],
    ["01/04", 100],
    ["02/04", 130],
    ["03/04", 130],
    ["04/04", 90],
    ["05/04", 150],
  ];

  const options = {
    title: "Doanh thu (theo ngày)",
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

export default Doanhthutheongay;
