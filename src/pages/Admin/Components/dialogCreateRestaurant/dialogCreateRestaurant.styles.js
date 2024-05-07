import styled from "@emotion/styled";

export const InfoContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "10px",
}));

export const InputBrowse = styled("label")(({ theme }) => ({
  padding: "5px",
  border: "1px solid #ccc",
  margin: "10px 0",
}));

export const ImagePreviewContainer = styled("div")(({ theme }) => ({
  margin: "20px 0",
}));
