import React, { useContext, useState } from "react";
import "./Card.scss";
import star from "../../media/img/pl-icon-star.png";
import whiteStar from "../../media/img/white-star.svg";
import { UserContext } from "../../App";
import axios from "axios";
import { IExampleFlower } from "../../Types/IHome";
import { IContext } from "../../Types/IApp";
import {
  ICardProps,
  ILikeFlowerResponse,
  IGetFavorites,
  ISingleFlower,
  IDeleteResponse,
} from "../../Types/ICard";

const Card: React.FC<ICardProps> = ({
  flowerData,
  refreshFavorites,
}): JSX.Element => {
  const { loggedIn } = useContext<IContext>(UserContext);
  const [flowerInfo, setFlowerInfo] = useState<IExampleFlower>(flowerData);

  const likeFlower = async (): Promise<void> => {
    try {
      await axios.post<ILikeFlowerResponse>(
        `https://flowrspot-api.herokuapp.com/api/v1/flowers/${flowerData.id}/favorites`,
        "",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      try {
        const response2 = await axios.get<IGetFavorites>(
          `https://flowrspot-api.herokuapp.com/api/v1/flowers/favorites?page=1`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        response2.data.fav_flowers.map((flower: ISingleFlower) => {
          if (flower.flower.id === flowerData.id) {
            setFlowerInfo(flower.flower);
          }
        });
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const unlikeFlower = async (): Promise<void> => {
    try {
      const response = await axios.get<IGetFavorites>(
        `https://flowrspot-api.herokuapp.com/api/v1/flowers/favorites?page=1`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      response.data.fav_flowers.map((flower: ISingleFlower) => {
        if (flower.flower.id === flowerData.id) {
          flowerInfo.likeId = flower.id;
        }
      });

      try {
        // /api/v1/flowers/{flower_id}/favorites/{id}
        const response = await axios.delete<IDeleteResponse>(
          `https://flowrspot-api.herokuapp.com/api/v1/flowers/${flowerData.id}/favorites/${flowerInfo.likeId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response) setFlowerInfo(response.data.fav_flower.flower);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
    refreshFavorites();
  };

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
            flowerInfo.favorite &&
            "linear-gradient(270deg, #ECBCB3 0%, #EAA79E 100%)",
        }}
      >
        Sightings: {flowerData.sightings}
      </div>
      {loggedIn && (
        <div
          className="star-container"
          onClick={() => (flowerInfo.favorite ? unlikeFlower() : likeFlower())}
          style={{
            background:
              flowerInfo.favorite &&
              "linear-gradient(270deg, #ECBCB3 0%, #EAA79E 100%)",
          }}
        >
          {flowerInfo.favorite ? (
            <img src={whiteStar} alt="White like star" />
          ) : (
            <img src={star} alt="Like Star" />
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
