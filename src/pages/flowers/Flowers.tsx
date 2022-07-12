import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Card from "../../components/card/Card";
import "./Flowers.scss";
import { IContext } from "../../Types/IApp";
import { IExampleFlower } from "../../Types/IHome";
import { ISingleFlower, IGetFavorites, IFavFlower } from "../../Types/ICard";
import { IRandomFlowers } from "../../Types/IFlowers";
import {
  fetchFavorites,
  fetchRandomFlowers,
} from "../../components/services/api";

const Flowers: React.FC = (): JSX.Element => {
  const [flowerData, setFlowerData] = useState<IExampleFlower[]>();
  const [favorites, setFavorites] = useState<ISingleFlower[]>();

  const { loggedIn } = useContext<IContext>(UserContext);

  const getFavorites = async (): Promise<void> => {
    try {
      const response2 = await fetchFavorites();

      setFavorites(response2.data.fav_flowers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  const getRandomFlowers = async (): Promise<void> => {
    let isFavorite: boolean = false;
    let newArray: IExampleFlower[] = [];
    try {
      const res = await fetchRandomFlowers();

      res.data.flowers.forEach((flower: IExampleFlower) => {
        favorites?.forEach((favorite: IFavFlower) => {
          if (flower.id === favorite.flower.id) {
            isFavorite = true;
          }
        });
        isFavorite ? (isFavorite = false) : newArray.push(flower);
      });
      setFlowerData(newArray);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!favorites) return;
    getRandomFlowers();
  }, [favorites]);

  if (loggedIn) {
    return (
      <div className="flowers-content">
        {flowerData?.map((flowerData, index) => (
          <Card
            flowerData={flowerData}
            key={index}
            refreshFavorites={() => {}}
          />
        ))}
      </div>
    );
  } else {
    return <>You need to be logged in!!!</>;
  }
};

export default Flowers;
