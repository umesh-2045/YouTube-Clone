import React, { useEffect, useState } from "react";
import "./Playvideo.css";
import vide01 from "../../assets/assets/video.mp4";
import like from "../../assets/assets/like.png";
import dislike from "../../assets/assets/dislike.png";
import share from "../../assets/assets/share.png";
import save from "../../assets/assets/save.png";
import user_profile from "../../assets/assets/user_profile.jpg";
import jack from "../../assets/assets/jack.png";
import API_KEY, { value_converter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

const Playvideo = () => {
  const { videoId } = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    const response = await fetch(videoDetails_url);
    const data = await response.json();
    setApiData(data.items[0]);
  };

  const fetchChannelData = async (channelId) => {
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`;
    const response = await fetch(channelData_url);
    const data = await response.json();
    setChannelData(data.items[0]);
  };

  const fetchCommentData = async () => {
    const commentData_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    const response = await fetch(commentData_url);
    const data = await response.json();
    setCommentData(data.items || []);
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    if (apiData?.snippet?.channelId) {
      fetchChannelData(apiData.snippet.channelId);
      fetchCommentData();
    }
  }, [apiData]);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <h3>{apiData ? apiData.snippet.title : "TITLE HERE"}</h3>

      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "19k"}
          Views &bull;
          {apiData
            ? moment(apiData.snippet.publishedAt).fromNow()
            : "1 day ago"}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_converter(apiData.statistics.likeCount) : 2}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>

      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ""}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : "umesh"}</p>
          <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "1M"}{" "}
            Subscribers
          </span>
        </div>
        <button>Subscribed</button>
      </div>

      <div className="vid-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "description here"}
        </p>
        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : "102"}{" "}
          comment
        </h4>

        {commentData.length > 0 ? (
          commentData.map((item, index) => {
            const topComment = item.snippet.topLevelComment.snippet;
            return (
              <div className="comment" key={index}>
                <img
                  src={
                    item.snippet.topLevelComment.snippet.authorProfileImageUrl
                  }
                  alt=""
                />
                <div>
                  <h3>
                    {item.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                    <span>{moment(topComment.publishedAt).fromNow()}</span>
                  </h3>
                  <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                  <div className="comment-action">
                    <img src={like} alt="" />
                    <span>
                      {value_converter(
                        item.snippet.topLevelComment.snippet.likeCount
                      )}
                    </span>
                    <img src={dislike} alt="" />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Loading comments...</p>
        )}
      </div>
    </div>
  );
};

export default Playvideo;
