import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Card from "../../components/card/Card";
import "./Favorites.scss";
import { IContext } from "../../Types/IApp";
import { IGetFavorites, ISingleFlower } from "../../Types/ICard";

const Favorites: React.FC = (): JSX.Element => {
  const { loggedIn } = useContext<IContext>(UserContext);
  const [flowers, setFlowers] = useState<ISingleFlower[]>();

  useEffect(() => {
    const getFavorites = async (): Promise<void> => {
      try {
        const response = await axios.get<IGetFavorites>(
          `https://flowrspot-api.herokuapp.com/api/v1/flowers/favorites?page=1`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFlowers(response.data.fav_flowers);
      } catch (err) {
        console.log(err);
      }
    };

    getFavorites();
  }, []);

  const refreshFavorites = async (): Promise<void> => {
    try {
      const response = await axios.get<IGetFavorites>(
        `https://flowrspot-api.herokuapp.com/api/v1/flowers/favorites?page=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFlowers(response.data.fav_flowers);
    } catch (err) {
      console.log(err);
    }
  };

  if (loggedIn) {
    return (
      <div className="favorites-content">
        {flowers?.map((flowers: ISingleFlower, index: number) => {
          const data = flowers.flower;
          return (
            <Card
              refreshFavorites={refreshFavorites}
              flowerData={data}
              key={index}
            />
          );
        })}
      </div>
    );
  }

  return <div>You need to be logged in!!!</div>;
};

export default Favorites;
