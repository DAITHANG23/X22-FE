import React from "react";
import { Chart } from "react-google-charts";

const Datbantheongay = () => {
  const data = [
    ["Tháng", "Lượng yêu cầu"],
    ["04/2024", 90],
    ["05/2024", 158],
    ["06/2024", 110],
    ["07/2024", 60],
  ];

  const options = {
    chart: {
      title: "Số lượng đặt bàn (theo ngày)",
      subtitle: "",
    },
    // Add vAxis property to define y-axis options
    vAxis: {
      // Set maximum value for the y-axis
      maxValue: 200,
    },
  };

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default Datbantheongay;
