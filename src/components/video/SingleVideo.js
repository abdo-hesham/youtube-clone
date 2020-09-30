import React from "react";
import YouTube from "react-youtube";

const SingleVideo = ({ video, onItemSelect }) => {
  const opts = {
    width: "90%",
    height: "300px",
    playerVars: {
      autoplay: 1
    }
  };
  const {
    id: { videoId },
    snippet: { title, channelTitle, description, channelId }
  } = video;
  return (
    video && (
      <div className="centered">
        <div style={{ margin: "20px auto", maxWidth: "600px" }}>
          <YouTube videoId={videoId} opts={opts} />
        </div>
        <div className="card--single">
          <div className="card__body" style={{ margin: "0 auto" }}>
            <h3
              className="card__body--title"
              dangerouslySetInnerHTML={{ __html: title }}
            ></h3>
            <p className="card__body--info">
              <span onClick={() => onItemSelect("channels", video, channelId)}>
                {channelTitle}
              </span>
            </p>
            <p
              className="card__body--description"
              style={{ maxHeight: "unset" }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default SingleVideo;
