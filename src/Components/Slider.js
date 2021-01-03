import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const Container = styled(Slider)`
  width: 100vw;
  min-width: 1300px;
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

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    autoplaySpeed: 3000,
  };
  return (
    <Container {...settings}>
      <div>
        <img src="/images/Notice/party.jpg" alt="party" />
      </div>
      <div>
        <img src="/images/Notice/mask.jpg" alt="mask" />
      </div>
      <div>
        <img src="/images/Notice/intro.jpg" alt="intro" />
      </div>
      <div>
        <img src="/images/Notice/newyear.jpg" alt="newyear" />
      </div>
      <div>
        <img src="/images/Notice/coffee.jpg" alt="coffee" />
      </div>
    </Container>
  );
}