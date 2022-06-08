import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Sightings.scss";
import SightingsCard from "./SightingsCard";
import { ISightings, IReturnValues } from "../../Types/ISightings";

export default function Sightings(): JSX.Element {
  const [sightings, setSightings] = useState<ISightings[]>();

  const getSightings = async (): Promise<void> => {
    try {
      const response = await axios.get<IReturnValues>(
        `https://flowrspot-api.herokuapp.com/api/v1/sightings?page=6`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setSightings(response.data.sightings);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSightings();
  }, []);

  return (
    <>
      <div className="sightings-background">
        <div className="sightings-text">
          <h1>Sighting List</h1>
          <h3>Explore between more than 8.427 sightings</h3>
        </div>
        <button className="sightings-button">+ Add New Sighting</button>
      </div>
      <div className="sightings-wrapper">
        {sightings?.map((sightings: ISightings, index: number) => (
          <SightingsCard sightings={sightings} key={index} />
        ))}
      </div>
    </>
  );
}
