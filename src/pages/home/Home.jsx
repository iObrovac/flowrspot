import React from "react";
import "./Home.scss";

export default function Home() {
  return (
    <div className="hero-container">
      <h1 className="hero-title">Discover flowers around you</h1>
      <h4 className="hero-subtitle">
        Explore between more than 8.427 sightings
      </h4>
      <input
        type="text"
        className="hero-input"
        placeholder="Looking for something specific?"
      />
    </div>
  );
}
