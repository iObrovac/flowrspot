import React, { useState } from "react";
import "./Card.scss";
import star from "../../media/img/pl-icon-star.png";
import whiteStar from "../../media/img/white-star.svg";

export default function Card({ flowerData }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      className="card-wrapper"
      style={{
        backgroundImage: `url(${flowerData.profile_picture})`,
      }}
    >
      <h3 className="card-title">{flowerData.name}</h3>
      <h5 className="card-subtitle">{flowerData.latin_name}</h5>
      <div
        className="card-sightings"
        style={{
          background:
            isLiked && "linear-gradient(270deg, #ECBCB3 0%, #EAA79E 100%)",
        }}
      >
        Sightings: {flowerData.sightings}
      </div>
      <div
        className="star-container"
        onClick={() => setIsLiked((prev) => !prev)}
        style={{
          background:
            isLiked && "linear-gradient(270deg, #ECBCB3 0%, #EAA79E 100%)",
        }}
      >
        {isLiked ? (
          <img src={whiteStar} alt="White like star" />
        ) : (
          <img src={star} alt="Like Star" />
        )}
      </div>
    </div>
  );
}
