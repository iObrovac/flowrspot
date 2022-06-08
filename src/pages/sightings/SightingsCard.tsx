import React from "react";
import profile from "../../media/img/profile-picture-2.png";
import commentIcon from "../../media/img/comment-icon.png";
import favIcon from "../../media/img/fav-icon.png";
import locationIcon from "../../media/img/location-icon.png";
import { ISightings } from "../../Types/ISightings";
import "./SightingsCard.scss";

function SightingsCard({ sightings }: { sightings: ISightings }) {
  return (
    <div className="sighting-container">
      <div
        className="sighting-image"
        style={{
          backgroundImage: `url(${sightings.flower.profile_picture})`,
        }}
      >
        <div className="sighting-location">
          <img src={locationIcon} alt="" />
          <h4>San Francisco, US</h4>
        </div>
      </div>
      <div className="sighting-user-container">
        <img src={profile} alt="Profile" />
        <div>
          <h1>{sightings.name}</h1>
          <h3>by Adam Moore</h3>
        </div>
      </div>
      <div className="sighting-description">{sightings.description}</div>
      <div className="sighting-bottom">
        <div className="sighting-comments">
          <img src={commentIcon} alt="" />
          <h3>{sightings.comments_count} Comments</h3>
        </div>
        <div className="sighting-favorites">
          <img src={favIcon} alt="" />
          <h3>{sightings.likes_count} Favorites</h3>
        </div>
      </div>
    </div>
  );
}

export default SightingsCard;
