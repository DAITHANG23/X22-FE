import {
  styled,
  AppBar,
  Badge,
  Box,
  Button,
  Menu,
  Typography,
  IconButton,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";
export const useStyles = makeStyles((theme) => ({
  menuContainer: {
    "& .MuiPaper-root": {
      backgroundColor: theme.palette.common.white,
      backgroundImage:
        "url(https://minimals.cc/assets/cyan-blur.png),url(https://minimals.cc/assets/red-blur.png) ",
      borderRadius: "10px",
      width: "200px",
      backgroundRepeat: "no-repeat, no-repeat",
      backgroundPosition: " right top, left bottom",
      backgroundSize: "50%, 50%",
      position: "absolute",
      top: "72px",
    },
  },

  menuPaperProps: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },

  IconButton: (anchorElUser) => ({
    background: anchorElUser
      ? "linear-gradient(135deg, rgb(255, 193, 172) 0%, rgb(255, 48, 48) 100%)"
      : "linear-gradient(135deg, #E8ECEE 0%, #E8ECEE 100%)",
    borderRadius: "50%",
    padding: "3px",
    overflow: "visible",
    fontSize: "14px",
    border: 0,
    outline: 0,
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  }),

  buttonSignin: {
    fontSize: "14px",
    fontWeight: 700,
    border: "1px solid #94999C",
    borderRadius: "8px",
    padding: "5px 12px",
    backgroundColor: theme.palette.common.white,
    textTransform: "none",
    color: "#121212",
    "&:hover": {
      border: "1px solid #121212",
      backgroundColor: "#E8ECEE",
    },
  },

  emailText: {
    fontSize: "14px !important",
    fontWeight: 400,
    color: "#94999C",
  },

  nameText: {
    fontSize: "14px !important",
    fontWeight: 400,
    color: theme.palette.common.black,
  },

  divider: {
    borderStyle: "dashed !important ",
    borderColor: "rgba(145, 158, 171, 0.2)",
  },

  textLogout: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#E21350",
  },
}));

export const BoxContainer = styled("div")(({ theme }) => ({
  fontWeight: 700,
  fontSize: "20px",
  color: theme.palette.common.black,
}));

export const StyledBoxLogoDisplayMd = styled(Box)`
display: { xs: "none", md: "flex" },
`;

export const StyledBoxName = styled(Box)(() => ({
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
}));

export const StyledImageLogo = styled("img")(() => ({
  borderRadius: "1000px",
  border: "none",
  margin: "10px 0px",
}));

export const StyledBoxLogoDisplaySx = styled(Box)`
display: { xs: "flex", md: "none" },
`;

export const StyledMenu = styled(Menu)`
display: { xs: "block", md: "none" },
`;

export const StyledLinkMenu = styled(Typography)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

export const StyledLinkNav = styled(Typography)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.background.paper,
}));

export const StyledButtonLink = styled(Button)(() => ({
  my: 2,
  display: "block",
}));

export const StyledBoxAvatar = styled(Box)(() => ({
  flexGrow: 0,
}));

export const StyledMenuAvatar = styled(Menu)(() => ({
  mt: "45px",
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export const StyledAppbar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  top: "0",
  left: "0",
  zIndex: "10",
  backgroundColor: "rgba(208,33,40)",
}));

export const StyledTextLogout = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: 600,
  color: "#E21350",
}));

export const StyledIconButton = styled(IconButton)(({ anchorElUser }) => ({
  background: anchorElUser
    ? "linear-gradient(135deg, rgb(255, 193, 172) 0%, rgb(255, 48, 48) 100%)"
    : "linear-gradient(135deg, #E8ECEE 0%, #E8ECEE 100%)",
  borderRadius: "50%",
  padding: "3px",
  overflow: "visible",
  fontSize: "14px",
  border: 0,
  outline: 0,
  transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
}));

export const StyledButtonSignIn = styled(Button)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 700,
  border: "1px solid #94999C",
  borderRadius: "8px",
  padding: "5px 12px",
  backgroundColor: theme.palette.common.white,
  textTransform: "none",
  color: theme.palette.common.black,
  "&:hover": {
    border: `1px solid ${theme.palette.common.black}`,
    backgroundColor: theme.palette.grey[800],
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  extDecoration: "none",
  color: theme.palette.common.black,
}));
