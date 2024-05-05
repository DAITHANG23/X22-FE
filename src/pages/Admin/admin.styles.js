import { TableCell, styled } from "@mui/material";

export const AdminContainer = styled("div")(({ theme }) => ({
  marginTop: "110px",
}));

export const AdminHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "16px 24px",
}));

export const AddRestaurantButton = styled("button")(({ theme }) => ({
  padding: "15px",
  backgroundColor: "red",
  color: "#fff",
  borderRadius: "5px",
  fontSize: "20px",
}));

export const TableCellHeader = styled(TableCell)(({ theme }) => ({
  fontSize: "20px",
}));
