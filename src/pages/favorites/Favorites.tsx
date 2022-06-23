import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Card from "../../components/card/Card";
import "./Favorites.scss";
import { IContext } from "../../Types/IApp";
import { IGetFavorites, ISingleFlower } from "../../Types/ICard";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../state";
import { bindActionCreators } from "redux";
import { fetchFavorites } from "../../components/services/api";

const Favorites: React.FC = (): JSX.Element => {
  const { loggedIn } = useContext<IContext>(UserContext);

  const dispatch = useDispatch();
  const { updateFavFlowers } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const getFavorites = async (): Promise<void> => {
      try {
        const response = await fetchFavorites();

        console.log("faw flow:", response.data.fav_flowers);

        // SAVE FAV FLOWER DATA TO REDUX
        updateFavFlowers(response.data.fav_flowers);
      } catch (err) {
        console.log(err);
      }
    };

    getFavorites();
  }, []);

  // TAKING FAVORITES FROM THE REDUX STATE
  const flowersRedux = useSelector((state: State) => state.favFlowers);

  if (loggedIn) {
    return (
      <div className="favorites-content">
        {flowersRedux?.map((flowers: ISingleFlower, index: number) => {
          const data = flowers.flower;
          return (
            <Card refreshFavorites={() => {}} flowerData={data} key={index} />
          );
        })}
      </div>
    );
  }

  return <div>You need to be logged in!!!</div>;
};

export default Favorites;
