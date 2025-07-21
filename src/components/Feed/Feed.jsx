import React, { useEffect, useState } from "react";
import "./Feed.css";
import thumbnail1 from "../../assets/assets/thumbnail1.png";
import thumbnail2 from "../../assets/assets/thumbnail2.png";
import thumbnail3 from "../../assets/assets/thumbnail3.png";
import thumbnail4 from "../../assets/assets/thumbnail4.png";
import thumbnail5 from "../../assets/assets/thumbnail5.png";
import thumbnail6 from "../../assets/assets/thumbnail6.png";
import thumbnail7 from "../../assets/assets/thumbnail7.png";
import thumbnail8 from "../../assets/assets/thumbnail8.png";
import { Link } from "react-router-dom";
import API_KEY from "../../data";
import { value_converter } from "../../data";
import moment from "moment";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(videoList_url)
      .then((response) => response.json())
      .then((data) => setData(data.items)); // ✅ Corrected from data.item
  };

  useEffect(() => {
    fetchData();
  }, [category]); // ✅ Removed stray brace

  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <Link
            to={`video/${category}/${item.id}`}
            className="card"
            key={index}
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />{" "}
            {/* ✅ Fixed alt tag */}
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {value_converter(item.statistics.viewCount)} views &bull;{" "}
              {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;
