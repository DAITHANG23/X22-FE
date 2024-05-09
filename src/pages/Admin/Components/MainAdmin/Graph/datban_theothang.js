import React from "react";
import { Chart } from "react-google-charts";

const Datbantheothang = () => {
  const data = [
    ["Ngày", "Lượng yêu cầu"],
    ["01/04", 15],
    ["02/04", 18],
    ["04/04", 17],
    ["04/04", 13],
  ];

  const options = {
    chart: {
      title: "Số lượng đặt bàn (theo ngày)",
      subtitle: "",
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

export default Datbantheothang;
