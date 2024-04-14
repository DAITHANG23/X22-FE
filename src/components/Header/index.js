import React, { useState } from "react";
import {
  StyledAppbar,
  StyledImageLogo,
  StyledLinkMenu,
  StyledButtonLink,
  StyledLinkNav,
  StyledBoxAvatar,
  StyledBadge,
  useStyles,
  StyledBoxName,
  StyledTextLogout,
  StyledIconButton,
  StyledButtonSignIn,
  StyledLink,
} from "./Header.styles";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { PAGES_NAVBAR, SETTINGS_ACCOUNT } from "./constant";
import { useAppContext } from "../../context/AppContext";

const Header = () => {
  const { isLogin } = useAppContext();
  const [anchorElNav, setAnchorElNav] = useState();

  const [anchorElUser, setAnchorElUser] = useState();

  const classes = useStyles();

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(false);
  };

  const handleCloseUserMenu = (value) => {
    // if (value === "Profile") {
    //   navigate("/admin/user/thang");
    // }

    if (value === "Hoạt động đặt bàn") {
      navigate("/reservations");
    }

    setAnchorElUser(false);
  };

  const onChoosePageLink = (page) => {
    if (page === "trang chủ") {
      navigate(`/dashboard`);
    } else {
      navigate(`/${page}`);
    }
  };

  const onClickLogoutAccount = () => {
    setAnchorElUser(false);

    navigate(`/login`);
  };

  return (
    <StyledAppbar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <StyledImageLogo
                src="/images/logo-restaurant.png"
                alt="logo"
                width={80}
                height={80}
              />
            </Box>
          </Link>

          <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
            <StyledIconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              anchorElUser={anchorElUser}
            >
              <MenuIcon />
            </StyledIconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={anchorElNav}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {PAGES_NAVBAR.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <StyledLinkMenu
                    onClick={() => onChoosePageLink(page.toLowerCase())}
                  >
                    {page}
                  </StyledLinkMenu>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <Link to="/dashboard">
              <StyledImageLogo
                src="/images/logo-restaurant.png"
                alt="logo"
                width={80}
                height={80}
              />
            </Link>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              ml: "100px",
            }}
          >
            {PAGES_NAVBAR.map((page) => (
              <StyledButtonLink key={page} onClick={handleCloseNavMenu}>
                <StyledLinkNav
                  onClick={() => onChoosePageLink(page.toLowerCase())}
                >
                  {page}
                </StyledLinkNav>
              </StyledButtonLink>
            ))}
          </Box>

          {isLogin ? (
            <StyledBoxAvatar>
              <Tooltip title="Account settings">
                <StyledIconButton
                  onClick={handleOpenUserMenu}
                  anchorElUser={anchorElUser}
                >
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      src={"/images/avatar.jpg"}
                      sx={{ border: "2px solid #FFF" }}
                    />
                  </StyledBadge>
                </StyledIconButton>
              </Tooltip>
              <Menu
                id="account-menu"
                open={anchorElUser}
                onClose={handleCloseUserMenu}
                anchorEl={anchorElUser}
                className={classes.menuContainer}
                PaperProps={{
                  elevation: 0,
                  classes: { paper: classes.menuPaperProps },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={() => handleCloseUserMenu("Profile")}>
                  <StyledBoxName>
                    <Typography className={classes.nameText}>
                      {/* {userItem.name} {userItem.lastName} */}
                      Dom Nguyen
                    </Typography>
                    <Typography className={classes.emailText}>
                      {/* {userItem.about?.mail} */}
                      Dom.nguyen@gmail.com
                    </Typography>
                  </StyledBoxName>
                </MenuItem>
                <Divider className={classes.divider} />
                {SETTINGS_ACCOUNT.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center" className={classes.nameText}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
                <Divider className={classes.divider} />
                <MenuItem onClick={onClickLogoutAccount}>
                  <StyledTextLogout textAlign="center">Logout</StyledTextLogout>
                </MenuItem>
              </Menu>
            </StyledBoxAvatar>
          ) : (
            <StyledButtonSignIn>
              <StyledLink to={"/login"}>Sign in</StyledLink>
            </StyledButtonSignIn>
          )}
        </Toolbar>
      </Container>
    </StyledAppbar>
  );
};

export default Header;
