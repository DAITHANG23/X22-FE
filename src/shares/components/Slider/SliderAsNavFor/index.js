import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { StyledAvatar, StyledSlider, useStyles } from "./Slider.styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function AsNavFor({ imagesList }) {
  const classes = useStyles();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [chooseImage, setChooseImage] = useState(imagesList[0].image);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const onChooseImage = (value) => {
    setChooseImage(value);
  };
  return (
    <div className={classes.sliderContainer}>
      <Slider
        asNavFor={nav2}
        ref={(slider) => (sliderRef1 = slider)}
        nextArrow={<div style={{ display: "none" }}></div>}
        prevArrow={<div style={{ display: "none" }}></div>}
      >
        {imagesList.map((item, index) => {
          return (
            <div key={index}>
              <img
                src={item.image}
                alt="restaurant"
                width={"100%"}
                height={"500px"}
                style={{ borderRadius: "16px" }}
              />
            </div>
          );
        })}
      </Slider>
      <div style={{ maxWidth: "384px", margin: "0 auto" }}>
        <StyledSlider
          asNavFor={nav1}
          ref={(slider) => (sliderRef2 = slider)}
          slidesToShow={5}
          swipeToSlide={true}
          focusOnSelect={true}
          nextArrow={<div style={{ display: "none" }}></div>}
          prevArrow={<div style={{ display: "none" }}></div>}
        >
          {imagesList.map((item, index) => {
            return (
              <div onClick={() => onChooseImage(item?.image)}>
                <StyledAvatar
                  key={index}
                  src={item.image}
                  isChoose={item.image === chooseImage}
                />
              </div>
            );
          })}
        </StyledSlider>
      </div>
    </div>
  );
}

export default AsNavFor;
