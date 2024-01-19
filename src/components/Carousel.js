import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function CarouselComponent() {
  return (
    <Carousel autoPlay="true" infiniteLoop="true" showArrows="true">
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage: "url('/banner1.jpg')",
          height: 400,
        }}
      >
        <div className="mask">
          <div className="d-flex justify-content-center align-items-center h-100"></div>
        </div>
      </div>
      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage: "url('/banner2.jpg')",
          height: 400,
        }}
      >
        <div className="mask">
          <div className="d-flex justify-content-center align-items-center h-100"></div>
        </div>
      </div>
    </Carousel>
  );
}
