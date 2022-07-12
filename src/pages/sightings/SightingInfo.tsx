import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchComments,
  fetchOneSighting,
  postMyComment,
} from "../../components/services/api";
import { IComment, ISightings } from "../../Types/ISightings";
import "./SightingInfo.scss";
import locationIcon from "../../media/img/pl-icon-location.png";
import commentIcon from "../../media/img/comment-icon.png";
import favIcon from "../../media/img/fav-icon.png";
import profilePic from "../../media/img/profile-picture-2.png";
import avatar from "../../media/img/Avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../state";
import { updateSightingComments } from "../../state/action-creators/action-creators";

function SightingInfo() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [sighting, setSighting] = useState<ISightings>();
  const [comments, setComments] = useState<IComment[]>();
  const refComment = useRef<HTMLTextAreaElement>(null);
  const [myComment, setMyComment] = useState({
    content: "",
  });

  // Implementing redux in a new way ----------------
  const dispatch = useDispatch();
  const newComments = useSelector((state: State) => state.comments);

  const handleAddComment = () => {
    if (refComment.current) {
      refComment.current.focus();
    }
  };

  const fetchSight = async (): Promise<void> => {
    try {
      const res = await fetchOneSighting(Number(id));
      setSighting(res.data.sighting);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getComments = async (): Promise<void> => {
    try {
      const res = await fetchComments(Number(id));

      setComments(res.data.comments);

      // dispatching action the new way
      dispatch(updateSightingComments(res.data.comments));
    } catch (err) {
      console.log(err);
    }
  };

  const publishMyComment = async (): Promise<void> => {
    try {
      await postMyComment(Number(id), myComment);
    } catch (err) {
      console.log(err);
    } finally {
      setMyComment({ content: "" });
      getComments();
      fetchSight();
    }
  };

  useEffect(() => {
    fetchSight();
    getComments();
  }, []);

  if (loading)
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );

  return (
    <div className="sight-background">
      <div className="sight-map">
        <img
          className="sight-location-icon"
          src={locationIcon}
          alt="Location Icon"
        />
        <button className="view">View on Google Maps</button>
        <button className="report">Report</button>
      </div>
      <div className="sight-info">
        <img
          className="sight-profile-pic"
          src={sighting?.picture}
          alt="Sight Pic"
        />
        <div className="sight-data">
          <div className="sight-user">
            <img src={profilePic} alt="" />
            <div className="sight-user-data">
              <h3 className="sight-flower">{sighting?.name}</h3>
              <h4 className="sight-user-name">by {sighting?.user.full_name}</h4>
            </div>
          </div>

          <div className="sight-flower-about">
            Platycodon grandiflorus (from Ancient Greek πλατύς "wide" and κώδων
            "bell") is a species of herbaceous flowering perennial plant of the
            family Campanulaceae, and the only member of the genus Platycodon.
            It is native to East Asia (China, Korea, Japan, and the Russian Far
            East).[1] It is commonly known as balloon flower[2][3] (referring to
            the balloon-shaped flower buds), Chinese bellflower,[2] or
            platycodon.[2]
          </div>

          <hr className="sight-hr" />

          <div className="sight-comments-favorites">
            <img className="sight-comment" src={commentIcon} alt="" />
            <h4>{sighting?.comments_count} Comments</h4>
            <img className="sight-fav" src={favIcon} alt="" />
            <h4>{sighting?.likes_count} Favorites</h4>
          </div>
        </div>
      </div>
      <hr className="sight-hr-2" />
      <div className="sight-comments-heading">
        <h3>{sighting?.comments_count} Comments</h3>
        <button onClick={handleAddComment} className="add-comment">
          Add Comment
        </button>
      </div>

      {newComments?.map((comment) => {
        return (
          <div key={comment.id} className="comments-container">
            <div className="comment-details">
              <img className="comment-picture" src={avatar} alt="" />
              <div className="comment-info">
                <h3 className="comment-title">{comment?.user_full_name}</h3>
                <h4 className="comment-created">4 days ago</h4>
              </div>
            </div>
            <div className="comment-content">{comment?.content}</div>
            <hr className="comment-hr" />
          </div>
        );
      })}

      <div className="comment-submission">
        <textarea
          ref={refComment}
          className="comment-input"
          placeholder="Write a comment..."
          value={myComment.content}
          onChange={(e) => setMyComment({ content: e.target.value })}
        />
        <button onClick={publishMyComment} className="comment-publish">
          Publish Comment
        </button>
      </div>
    </div>
  );
}

export default SightingInfo;
