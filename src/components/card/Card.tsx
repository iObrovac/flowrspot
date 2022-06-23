import React, { useContext, useState } from "react";
import "./Card.scss";
import star from "../../media/img/pl-icon-star.png";
import whiteStar from "../../media/img/white-star.svg";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { IExampleFlower } from "../../Types/IHome";
import { IContext } from "../../Types/IApp";
import { ICardProps, ISingleFlower } from "../../Types/ICard";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../state";
import { bindActionCreators } from "redux";
import { deleteFav, fetchFavorites, postLikeFlower } from "../services/api";
import { Link } from "react-router-dom";

const Card: React.FC<ICardProps> = ({
  flowerData,
  refreshFavorites,
}): JSX.Element => {
  const { loggedIn } = useContext<IContext>(UserContext);
  const [flowerInfo, setFlowerInfo] = useState<IExampleFlower>(flowerData);

  const dispatch = useDispatch();
  const { deleteOneFavFlower } = bindActionCreators(actionCreators, dispatch);
  let navigate = useNavigate();

  const likeFlower = async (): Promise<void> => {
    try {
      const res = await postLikeFlower(flowerData.id);
      console.log(res);

      try {
        const response2 = await fetchFavorites();

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
      const response = await fetchFavorites();
      console.log(response);
      response.data.fav_flowers.map((flower: ISingleFlower) => {
        if (flower.flower.id === flowerData.id) {
          flowerInfo.likeId = flower.id;
        }
      });

      try {
        const response = await deleteFav(flowerData.id, flowerInfo.likeId);

        // REMOVE THE FLOWER FROM REDUX STATE
        deleteOneFavFlower(flowerInfo.likeId);

        if (response) setFlowerInfo(response.data.fav_flower.flower);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Link
      className="card-wrapper"
      style={{
        backgroundImage: `url(${flowerData.profile_picture})`,
        cursor: "pointer",
      }}
      to={`/flowers/${flowerData.id}`}
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
        onClick={(e) => e.stopPropagation()}
      >
        Sightings: {flowerData.sightings}
      </div>
      {loggedIn && (
        <div
          className="star-container"
          onClick={(e) => {
            e.preventDefault();
            flowerInfo.favorite ? unlikeFlower() : likeFlower();
          }}
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
    </Link>
  );
};

export default Card;
