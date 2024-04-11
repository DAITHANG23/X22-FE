import { Avatar, Box, Button, Checkbox, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import Table from "../../../../shares/components/Table";
import { formatCurrency } from "../../../../utils";

const DishesListOrder = ({ data, setNextStep, setOrderDishesData }) => {
  const [selectedData, setSelectedData] = useState([]);

  const onSelectedRowChange = useCallback(
    (dishesData) => {
      if (dishesData) {
        const newData = dishesData.map((i) => {
          return { ...i, quantity: 1 };
        });
        setSelectedData(newData);
        setOrderDishesData(newData);
      }
    },
    [setOrderDishesData]
  );

  const getTotalPrice = (data) => {
    let totalPrice = 0;
    for (let i = 0; i < data.length; i++) {
      const cartItem = data[i];
      totalPrice += cartItem.price * cartItem.quantity;
    }
    return totalPrice;
  };

  const totalPrice = getTotalPrice(selectedData);

  const handleGotoNext = () => {
    setNextStep(true);
  };

  const columns = useMemo(() => {
    return [
      {
        accessorKey: "select-col",
        header: ({ table }) => {
          return (
            <Checkbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          );
        },
        size: 50,
        cell: ({ row }) => {
          return (
            <Checkbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: () => <span>Món ăn</span>,
        size: 350,
        cell: ({ row }) => {
          const { id, name, images } = row.original;
          return (
            <Box key={id} sx={{ display: "flex", gap: 30 }}>
              <Avatar
                src={images}
                sx={{
                  borderRadius: "12px",
                  width: 64,
                  height: 64,
                  marginRight: "16px",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  {name}
                </Typography>
              </Box>
            </Box>
          );
        },
      },
      {
        accessorKey: "price",

        header: () => <span>Đơn giá</span>,
        size: 150,
        cell: ({ row }) => {
          const { price } = row.original;
          return <>{formatCurrency(price, "VND")}</>;
        },
      },
      {
        accessorKey: "amount",
        header: () => "Số lượng",
        size: 200,
        cell: ({ row }) => {
          const { id } = row.original;

          const isDisabledButton = selectedData[row.index]?.quantity;

          const onDecreaseQuantity = (dishItemId) => {
            const cartIndexProduct = selectedData.findIndex((i) => {
              return i.id === dishItemId;
            });
            const updatingCart = [...selectedData];

            updatingCart[cartIndexProduct].quantity -= 1;
            setSelectedData(updatingCart);
          };

          const onIncreaseQuantity = (dishItemId) => {
            const cartIndexProduct = selectedData.findIndex((cartItem) => {
              return cartItem.id === dishItemId;
            });

            const updatingCart = [...selectedData];
            updatingCart[cartIndexProduct].quantity += 1;
            setSelectedData(updatingCart);
          };
          return (
            <Box key={id}>
              <button
                onClick={() => onDecreaseQuantity(id)}
                disabled={
                  !isDisabledButton || selectedData[row.index]?.quantity === 1
                }
                style={{
                  padding: "4px 8px",
                  marginRight: "4px",
                  backgroundColor: "#d02128",
                  border: "none",
                  borderRadius: "4px",
                  color: "#fff",
                  cursor: "pointer",
                  opacity: !isDisabledButton ? 0.7 : 1,
                }}
              >
                -
              </button>
              <span style={{ fontSize: "14px", fontWeight: 500 }}>
                {selectedData[row.index]?.quantity
                  ? selectedData[row.index]?.quantity
                  : "0"}
              </span>
              <button
                onClick={() => onIncreaseQuantity(id)}
                disabled={!isDisabledButton}
                style={{
                  padding: "4px 8px",
                  marginLeft: "4px",
                  backgroundColor: "#d02128",
                  border: "none",
                  borderRadius: "4px",
                  color: "#fff",
                  cursor: "pointer",
                  opacity: !isDisabledButton ? 0.7 : 1,
                }}
              >
                +
              </button>
            </Box>
          );
        },
      },
      {
        accessorKey: "totalPrice",
        header: () => <span>Thành tiền</span>,
        size: 200,
        cell: ({ row }) => {
          const totaPriceEachDish =
            selectedData[row.index]?.quantity * selectedData[row.index]?.price;
          return (
            <Typography sx={{ fontSize: "14px" }}>
              {formatCurrency(totaPriceEachDish, "VND")}
            </Typography>
          );
        },
      },
    ];
  }, [selectedData]);
  return (
    <div>
      <Box sx={{ position: "relative" }}>
        <Typography variant="h5" sx={{ paddingBottom: "20px" }}>
          Dành cho bạn
        </Typography>
        <Table
          columns={columns}
          data={data}
          onSelectedRowChange={onSelectedRowChange}
        />
        <Box
          sx={{
            display: "flex",
            gap: "6px",
            position: "absolute",
            bottom: "10px",
            left: "10px",
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>Tổng tiền:</Typography>
          <Typography sx={{ color: "#d02128", fontWeight: 600 }}>
            {formatCurrency(totalPrice, "VND")}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ marginTop: "32px", textAlign: "end" }}>
        <Button
          sx={{
            backgroundColor: !selectedData.length ? "#CED0D6" : "#15B138",
            color: "#FFF",
            textTransform: "none",
            padding: "6px 48px",
            fontSize: "16px",
            fontWeight: 600,
          }}
          disabled={!selectedData.length}
          onClick={handleGotoNext}
        >
          Tiếp
        </Button>
      </Box>
    </div>
  );
};

export default DishesListOrder;
