"use client";
import { Typography } from "@mui/material";
import React from "react";
import {
  StyledBoxContainer,
  StyledBoxFooterFirst,
  StyledBoxContent,
  StyledTitle,
  StyledBoxFooterSecond,
  StyledBoxLinkContact,
  StyledLogoFooter,
} from "./Footer.styles";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <StyledBoxContainer>
      <StyledBoxFooterFirst>
        <StyledBoxContent>
          <Typography>Về chúng tôi</Typography>
          <StyledTitle>RESTAURANTS BOOKING APP</StyledTitle>
        </StyledBoxContent>
      </StyledBoxFooterFirst>

      <StyledBoxFooterSecond>
        <Typography>Restaurants Booking App</Typography>

        <StyledLogoFooter
          src="/images/logo-restaurant.png"
          alt="logo"
          width={80}
          height={80}
        />
        <StyledBoxLinkContact>
          <Link href={"https://www.facebook.com"} target="_blank">
            <img
              src="/images/facebook.png"
              alt="facebook"
              width={36}
              height={36}
            />
          </Link>
          <Link href={"/"}>
            <img
              src="/images/instagram.png"
              alt="instagram"
              width={36}
              height={36}
            />
          </Link>
          <Link href={"https://www.youtube.com"} target="_blank">
            <img
              src="/images/youtube.png"
              alt="youtube"
              width={36}
              height={36}
            />
          </Link>

          <Link href={"/"}>
            <img
              src="/images/Linkedin.png"
              alt="Linkedin"
              width={36}
              height={36}
            />
          </Link>
        </StyledBoxLinkContact>
      </StyledBoxFooterSecond>
    </StyledBoxContainer>
  );
};

export default Footer;
