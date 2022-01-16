import React, { useState } from "react";
import unloadImage from "../images/unloadImage.svg";

const Card = ({ title, image }) => {
  const [imageUrl, setImageUrl] = useState(image);

  const handleImageNotLoad = () => {
    setImageUrl(unloadImage);
  };
  return (
    <div
      className={`
      group relative w-full h-full overflow-hidden shadow border-8 border-white
      p-4 max-h-80 aspect-[3/4] bg-cover bg-center bg-gradient-to-b from-gray via-transparent to-gray-dark
      transition-all duration-300
      hover:shadow-lg hover:shadow-secondary-300
      `}
    >
      <img
        className="mix-blend-overlay absolute inset-0 w-full h-full object-cover transition-all duration-800 group-hover:scale-110"
        src={imageUrl}
        onError={handleImageNotLoad}
        alt="card"
      />
      <div className="pl-2 pb-6 h-full flex items-end">
        <h3
          className={`
          text-white text-sm transition duration-300 ease-in
          group-hover:text-secondary-100
          `}
        >
          {title}
        </h3>
      </div>
    </div>
  );
};

export default Card;
