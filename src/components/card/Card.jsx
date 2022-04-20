import React from "react";
import "./Card.scss";

export default function Card({ flowerData }) {
  return (
    <div
      className="card-wrapper"
      style={{
        backgroundImage: `url(${flowerData.profile_picture})`,
      }}
    >
      <h3 className="card-title">{flowerData.name}</h3>
      <h5 className="card-subtitle">{flowerData.latin_name}</h5>
      <div className="card-sightings">Sightings: {flowerData.sightings}</div>
    </div>
  );
}
