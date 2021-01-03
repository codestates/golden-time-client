import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const Container = styled(Slider)`
  width: 450px;
	height: 450px;
  position: relative;
  .slick-prev {
    left: 3% !important;
    z-index: 1;
  }
  .slick-next {
    right: 3% !important;
    z-index: 1;
  }
`

const Image = styled.img`
  border-radius:15px;
  width: 450px;
	height: 450px;
  object-fit: cover;
`

export default function SimpleSlider({ goodsImages }) {
  var settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };
  return (
    <Container {...settings}>
      {goodsImages.map(item => (
        <Image src={item.imagePath} />
      ))}
    </Container>
  );
}