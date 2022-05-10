import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import Card from "../../components/card/Card";
import "./Flowers.scss";

export default function Flowers() {
  const [flowerData, setFlowerData] = useState();

  const { loggedIn, setLoggedIn } = useContext(UserContext);

  useEffect(() => {
    fetch(`https://flowrspot-api.herokuapp.com/api/v1/flowers/random`)
      .then((res) => res.json())
      .then((res) => {
        setFlowerData(res.flowers);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loggedIn) {
    return (
      <div className="flowers-content">
        {flowerData?.map((flowerData, index) => (
          <Card flowerData={flowerData} key={index} />
        ))}
      </div>
    );
  } else {
    return <>You need to be logged in!!!</>;
  }
}
