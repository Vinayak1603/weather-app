import React, { useEffect, useState } from "react";
import { useStateContext } from "../context";

// Background images for each condition
import Clear from "../assets/images/Clear.jpg";
import Fog from "../assets/images/fog.png";
import Cloudy from "../assets/images/Cloudy.jpg";
import Rainy from "../assets/images/Rainy.jpg";
import Snow from "../assets/images/snow.jpg";
import Stormy from "../assets/images/Stormy.jpg";
import Sunny from "../assets/images/Sunny.jpg";

const BackgroundLayout = () => {
  const { weather } = useStateContext();         // Access current weather
  const [image, setImage] = useState(Clear);     // Default image

  // Whenever the weather changes, update the background image
  useEffect(() => {
    if (weather.conditions) {
      let imageString = weather.conditions;

      // Match keywords in condition and set appropriate image
      if (imageString.toLowerCase().includes("clear")) {
        setImage(Clear);
      } else if (imageString.toLowerCase().includes("cloud")) {
        setImage(Cloudy);
      } else if (imageString.toLowerCase().includes("rain") || imageString.toLowerCase().includes("shower")) {
        setImage(Rainy);
      } else if (imageString.toLowerCase().includes("snow")) {
        setImage(Snow);
      } else if (imageString.toLowerCase().includes("fog")) {
        setImage(Fog);
      } else if (imageString.toLowerCase().includes("thunder") || imageString.toLowerCase().includes("storm")) {
        setImage(Stormy);
      }
    }
  }, [weather.conditions]); // Runs every time weather condition changes

  // Renders the background image behind everything
  return (
    <img
      src={image}
      alt="weather_image"
      className="h-screen w-full fixed left-0 top-0 -z-[10]"
    />
  );
};

export default BackgroundLayout;
