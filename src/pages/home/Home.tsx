import React, { useState, useEffect } from "react";
import "./Home.scss";
import icon from "../../media/img/icon-search.svg";
import Card from "../../components/card/Card";
import axios from "axios";
import { IExampleFlower, IFlowers } from "../../Types/IHome";

const Home: React.FC = (): JSX.Element => {
  const [currentData, setCurrentData] = useState<IExampleFlower[]>([]);
  const [input, setInput] = useState<string>("");

  const fetchFlowers = async (): Promise<void> => {
    try {
      const response = await axios.get<IFlowers>(
        `https://flowrspot-api.herokuapp.com/api/v1/flowers/search?query=${input}`
      );

      setCurrentData(response.data.flowers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFlowers();
  }, [input]);

  return (
    <div>
      <div className="hero-container">
        <h1 className="hero-title">Discover flowers around you</h1>
        <h4 className="hero-subtitle">
          Explore between more than 8.427 sightings
        </h4>
        <div className="hero-input-container">
          <input
            type="text"
            className="hero-input"
            placeholder="Looking for something specific?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <img src={icon} className="hero-search-icon" alt="Search Icon" />
        </div>
      </div>

      <div className="cards-container">
        {!!currentData &&
          currentData.map((flowerData, index) => (
            <Card
              flowerData={flowerData}
              key={index}
              refreshFavorites={() => {}}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
