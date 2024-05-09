import { Avatar, Box, Button, Checkbox, Typography } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";
import Table from "../../../../shares/components/Table";
import { formatCurrency } from "../../../../utils";
import { useStyles } from "./Restaurant.styles";
import clsx from "clsx";

const DishesListOrder = ({ data, setNextStep, setOrderDishesData }) => {
  const classes = useStyles();
  const [selectedData, setSelectedData] = useState([]);

  const onSelectedRowChange = useCallback(
    (dishesData) => {
      if (dishesData && dishesData?.length === 1) {
        const firstItem = dishesData[0];

        const findProductItem = data.find(
          (dishItem) => dishItem._id === firstItem._id
        );
        const indexOfAddingProductInCart = data.findIndex(
          (cartItem) => cartItem._id === firstItem._id
        );

        const newCartItem = {
          ...findProductItem,
          quantity: 1,
        };

        if (indexOfAddingProductInCart !== -1) {
          data[indexOfAddingProductInCart] = newCartItem;
        }

        setSelectedData(data);
        setOrderDishesData(data);
      } else if (dishesData?.length === 0) {
        data.map((i) => {
          delete i.quantity;
          return data;
        });
        setSelectedData(dishesData);
        setOrderDishesData(dishesData);
      } else if (dishesData && dishesData?.length > 1) {
        const newData = dishesData.map((i) => {
          return { ...i, quantity: 1 };
        });

        setSelectedData(newData);
        setOrderDishesData(newData);
      }
    },
    [setOrderDishesData, data]
  );

  const getTotalPrice = (data) => {
    let totalPrice = 0;
    for (let i = 0; i < data?.length; i++) {
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
          const { _id, name, images } = row.original;
          return (
            <div
              key={_id}
              style={{ display: "flex", gap: "16px" }}
              className={classes.nameDishesContainer}
            >
              <Avatar
                src={images}
                sx={{
                  borderRadius: "12px",
                  width: 64,
                  height: 64,
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
            </div>
          );
        },
      },
      {
        accessorKey: "price",

        header: () => <span>Đơn giá</span>,
        size: 150,
        cell: ({ row }) => {
          const { price } = row.original;
          return (
            <div className={classes.priceContainer}>
              {formatCurrency(price, "VND")}
            </div>
          );
        },
      },
      {
        accessorKey: "amount",
        header: () => "Số lượng",
        size: 300,
        cell: ({ row }) => {
          const { _id } = row.original;

          const isDisabledButton = selectedData[row.index]?.quantity;

          const onDecreaseQuantity = (dishItemId) => {
            const cartIndexProduct = selectedData.findIndex((i) => {
              return i._id === dishItemId;
            });
            const updatingCart = [...selectedData];

            updatingCart[cartIndexProduct].quantity -= 1;
            setSelectedData(updatingCart);
          };

          const onIncreaseQuantity = (dishItemId) => {
            const cartIndexProduct = selectedData.findIndex((cartItem) => {
              return cartItem._id === dishItemId;
            });

            const updatingCart = [...selectedData];
            updatingCart[cartIndexProduct].quantity += 1;
            setSelectedData(updatingCart);
          };
          return (
            <div key={_id} className={classes.amountContainer}>
              <button
                onClick={() => onDecreaseQuantity(_id)}
                disabled={
                  !isDisabledButton || selectedData[row.index]?.quantity === 1
                }
                className={clsx({
                  [classes.buttonAmount || ""]: true,
                  [classes.buttonAmountDes || ""]: true,
                  [classes.buttonAmountDisabled || ""]: isDisabledButton,
                })}
              >
                -
              </button>
              <span style={{ fontSize: "14px", fontWeight: 500 }}>
                {selectedData[row.index]?.quantity
                  ? selectedData[row.index]?.quantity
                  : "0"}
              </span>
              <button
                onClick={() => onIncreaseQuantity(_id)}
                disabled={!isDisabledButton}
                className={clsx({
                  [classes.buttonAmount || ""]: true,
                  [classes.buttonAmountIns || ""]: true,
                  [classes.buttonAmountDisabled || ""]: isDisabledButton,
                })}
              >
                +
              </button>
            </div>
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
            <Typography
              sx={{ fontSize: "14px" }}
              className={classes.totalDishes}
            >
              {formatCurrency(totaPriceEachDish, "VND")}
            </Typography>
          );
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className={classes.totalPriceFinal}>
          <Typography sx={{ fontWeight: 600 }}>Tổng tiền:</Typography>
          <Typography sx={{ color: "#d02128", fontWeight: 600 }}>
            {formatCurrency(totalPrice, "VND")}
          </Typography>
        </div>
      </Box>
      <Box sx={{ marginTop: "32px", textAlign: "end" }}>
        <Button
          sx={{
            backgroundColor: !selectedData?.length ? "#CED0D6" : "#15B138",
            color: "#FFF",
            textTransform: "none",
            padding: "6px 48px",
            fontSize: "16px",
            fontWeight: 600,
          }}
          disabled={!selectedData?.length}
          onClick={handleGotoNext}
        >
          Tiếp
        </Button>
      </Box>
    </div>
  );
};

export default DishesListOrder;
