import React, { useEffect, useState } from "react";
import "./Sightings.scss";
import SightingsCard from "./SightingsCard";
import { IPages, ISightings } from "../../Types/ISightings";
import { getSightingsData } from "../../components/services/api";

export default function Sightings(): JSX.Element {
  const [sightings, setSightings] = useState<ISightings[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<IPages>();

  const getSightings = async (): Promise<void> => {
    try {
      const response = await getSightingsData(currentPage);
      setPages(response.data.meta.pagination as IPages);
      setSightings(response.data.sightings as ISightings[]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSightings();
  }, [currentPage]);

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
      <div className="pagination">
        <button
          className="btn-prev"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage <= 1}
        >
          Prev
        </button>
        <h4 className="curr-page">{currentPage}</h4>
        <button
          className="btn-next"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
