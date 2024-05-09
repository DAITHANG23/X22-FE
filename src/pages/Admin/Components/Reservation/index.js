import React from "react";
import "./styles.css";
import { useEffect, useState, useMemo } from "react";
import reservations from "../../../../api/reservations";
import CustomModal from "../../../../shares/components/CustomModal";
import DishesListOrder from "../../../../pages/Dashboard/components/RestaurantDetail/DishesListOrder";
import InfoCustomerForm from "./InfoCustomerForm";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useAppContext } from "../../../../context/AppContext";
import { Button } from "@mui/material";
import PopUp from "./popup";
import useGetRestaurantDetails from "../../../Dashboard/hooks/useGetRestaurantDetail";
import { useQueryClient } from "react-query";
import { RESTAURANT_DETAIL_QUERY_KEY } from "../../../../pages/Dashboard/constant";

const Reservation = () => {
  const [dataResponse, setDataResponse] = useState([]);
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState();
  const [orderDishesData, setOrderDishesData] = useState([]);
  const [nextStep, setNextStep] = useState(false);
  const [id, setId] = useState();
  const [type, setType] = useState();
  const [popup, setPopup] = useState(false);
  const { token, idRestaurant } = useAppContext();
  const [tables, setTables] = useState([]);
  const [tableNumber, setTableNumber] = useState();
  const [capacity, setCapacity] = useState();
  const RESTAURANTS_DISHES_LIST_DATA = [
    {
      id: "1",
      name: "Phở",
      type: 0,
      images: "/images/dishes/pho.jpg",
      price: 80000,
      discount: 0,
    },

    {
      id: "2",
      name: "Bún bò",
      type: 1,
      images: "/images/dishes/bunbo.jpg",
      price: 65000,
      discount: 0,
    },

    {
      id: "3",
      name: "Lẩu Thái",
      type: 3,
      images: "/images/dishes/hotpot.webp",
      price: 300000,
      discount: 5,
    },
  ];
  //
  const [isRefetch, setIsRefetch] = useState();
  const queryClient = useQueryClient();
  const onLick = () => {
    setOpen(true);
  };
  const { restaurantDetailData, refetch } =
    useGetRestaurantDetails(idRestaurant);
  useEffect(() => {
    if (isRefetch) {
      queryClient.invalidateQueries(RESTAURANT_DETAIL_QUERY_KEY, {
        refetchInactive: true,
      });
      refetch();
    }
  }, [isRefetch, refetch, queryClient]);
  const listMenuRestaurant = useMemo(() => {
    if (restaurantDetailData?.menu?.length !== 0) {
      return restaurantDetailData?.menu;
    }
    return RESTAURANTS_DISHES_LIST_DATA;
  }, [restaurantDetailData]);
  console.log("listMenuRestaurant", listMenuRestaurant);
  //
  const handleClose = () => {
    setOpen(false);
    setNextStep(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const detailStatus = (status) => {
    if (status === 0) return "Chờ xác nhận";
    if (status === 1) return "Đã xác nhận";
    if (status === 2) return "Đã checkin";
    if (status === 3) return "Đã checkout";
    if (status === 4) return "Đã hủy";
  };
  const getReservation = async () => {
    const tmp = await reservations.getEmployeeReservations(token);
    setDataResponse(tmp.data.reservations);
  };
  const getAlltable = async () => {
    const tmp = await reservations.getAlltable(token);
    setTables(tmp.data.tables);
    console.log("tables", tables);
  };
  useEffect(() => {
    getReservation();
    getAlltable();
  }, [open, popup]);

  const handleEdit = (id, type) => {
    setId(id);
    setType(type);
    setPopup(true);
  };
  const handleCreateTable = async (e) => {
    e.preventDefault();
    const data = {
      tableNumber: tableNumber,
      capacity: capacity,
    };
    const tmp = await reservations.createTable(token, data);
    getAlltable();
    console.log(tmp);
  };
  return (
    <div className="ReservationContainer">
      <Button onClick={handleOpen}>Đặt bàn cho khách</Button>
      {popup && <PopUp id={id} setPopup={setPopup} type={type} />}
      <CustomModal open={open} onClose={handleClose}>
        {!nextStep ? (
          <DishesListOrder
            data={listMenuRestaurant}
            cart={cart}
            setCart={setCart}
            setNextStep={setNextStep}
            setOrderDishesData={setOrderDishesData}
          />
        ) : (
          <InfoCustomerForm
            setNextStep={setNextStep}
            orderDishesData={orderDishesData}
            idRestaurant={idRestaurant}
            handleClose={handleClose}
            setDataResponse={setDataResponse}
          />
        )}
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: "10px", right: "10px" }}
        >
          <CloseIcon />
        </IconButton>
      </CustomModal>
      <h2>Danh sách yêu cầu đặt bàn</h2>
      <div className="reservationAccept">
        {dataResponse.length === 0 && <p>Không có yêu cầu đặt bàn nào</p>}
        {dataResponse.map((i, index) => {
          if (
            i.status === 1 ||
            i.status === 2 ||
            i.status === 3 ||
            i.status === 4
          ) {
            return (
              <div key={index} className="reservationdetail">
                <div>Tên khách hàng: {i.name}</div>
                <div>Số điện thoại: {i.phoneNumber}</div>
                <div>Số lượng người: {i.people}</div>
                <div>Thời gian: {i.time}</div>
                <div>Trạng thái: {detailStatus(i.status)}</div>
                <div className="Buttondetail">
                  <button
                    onClick={() => {
                      handleEdit(i._id, 0);
                    }}
                  >
                    Chi tiết
                  </button>
                  {i.status === 1 && (
                    <button
                      onClick={() => {
                        handleEdit(i._id, 1);
                      }}
                    >
                      Check In
                    </button>
                  )}
                  {(i.status === 1 || i.status === 2) && (
                    <button
                      onClick={() => {
                        handleEdit(i._id, 2);
                      }}
                    >
                      Check Out
                    </button>
                  )}
                  {i.status === 0 && (
                    <button
                      onClick={() => {
                        handleEdit(i._id, 3);
                      }}
                    >
                      Xác nhận
                    </button>
                  )}
                  {i.status === 0 && (
                    <button
                      onClick={() => {
                        handleEdit(i._id, 4);
                      }}
                    >
                      Hủy
                    </button>
                  )}
                </div>
              </div>
            );
          } else return null;
        })}
      </div>
      <div className="line"></div>
      <h2>Yêu cầu chưa xác nhận</h2>
      <div className="reservationNotAccept">
        {dataResponse.length === 0 && <p>Không có yêu cầu đặt bàn nào</p>}
        {dataResponse.map((i, index) => {
          if (i.status === 0) {
            return (
              <div key={index} className="reservationdetail">
                <div>Tên khách hàng: {i.name}</div>
                <div>Số điện thoại: {i.phoneNumber}</div>
                <div>Số lượng người: {i.people}</div>
                <div>Thời gian: {i.time}</div>
                <div>Trạng thái: {detailStatus(i.status)}</div>
                <div className="Buttondetail">
                  <button
                    onClick={() => {
                      handleEdit(i._id, 0);
                    }}
                  >
                    Chi tiết
                  </button>
                  {i.status === 1 && (
                    <button
                      onClick={() => {
                        handleEdit(i._id, 1);
                      }}
                    >
                      Check In
                    </button>
                  )}
                  {(i.status === 1 || i.status === 2) && (
                    <button
                      onClick={() => {
                        handleEdit(i._id, 2);
                      }}
                    >
                      Check Out
                    </button>
                  )}
                  {i.status === 0 && (
                    <button
                      onClick={() => {
                        handleEdit(i._id, 3);
                      }}
                    >
                      Xác nhận
                    </button>
                  )}
                  {i.status === 0 && (
                    <button
                      onClick={() => {
                        handleEdit(i._id, 4);
                      }}
                    >
                      Hủy
                    </button>
                  )}
                </div>
              </div>
            );
          } else return null;
        })}
      </div>
      <div className="line"></div>
      <h2>Danh sách bàn</h2>
      <div className="reservationTable">
        {tables.length === 0 && <p>Không có bàn nào</p>}
        <div>
          <form>
            <input
              type="text"
              placeholder="BÀN SỐ"
              onChange={(e) => setTableNumber(e.target.value)}
            ></input>
            <input
              type="text"
              placeholder="SỨC CHỨA"
              onChange={(e) => setCapacity(e.target.value)}
            ></input>
            <button
              onClick={(e) => {
                handleCreateTable(e);
              }}
            >
              THÊM
            </button>
          </form>
        </div>
        <div className="tableContainer">
          {tables.map((i, index) => {
            return (
              <div key={index} className="tabledetail">
                <div>Bàn số: {i.tableNumber}</div>
                <div>Loại bàn: {i.capacity}</div>
                <div>Trạng thái: {i.status}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reservation;
