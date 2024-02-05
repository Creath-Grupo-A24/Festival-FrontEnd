import React, { useState, useEffect } from "react";
import "./festivalSlider.css";

const Slider = ({ evento }) => {
  const [slideIndex, slideIndexSet] = useState(0);
  const slideAmount = evento.categories.length;
  const slideInterval = 2;
  const sliderWidth = slideAmount * 100;
  const slideWidth = 100 / slideAmount;

  useEffect(() => {
    const interval = setInterval(() => {
      slideIndexSet((slideIndex) =>
        slideIndex == slideAmount - 1 ? 0 : slideIndex + 1
      );
    }, slideInterval * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="slider"
      style={{
        width: sliderWidth + "%",
        transform: "translateX(-" + slideIndex * slideWidth + "%)",
      }}
    >
      {evento.categories.map((categoria, index) => (
        <div
          className={"slide " + categoria.type}
          key={index}
          style={{ width: slideWidth + "%" }}
        ></div>
      ))}
    </div>
  );
};

export default Slider;
