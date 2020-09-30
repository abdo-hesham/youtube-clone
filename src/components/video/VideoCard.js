import React, { useState, useEffect } from "react";
import { getStats, getDuration } from "../../api";
import parseDuration from "youtube-duration-format";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import millify from "millify";
import play from "../../assets/images/play.svg";
import highlightWords from "highlight-words";
import Truncate from "react-truncate";
import commaNumber from "comma-number";

function VideoCard({ id, channelId, type, video, query, onItemSelect }) {
  const [viewCount, setviewCount] = useState(0);
  const [subscriberCount, setsubscriberCount] = useState(0);
  const [videosCount, setvideosCount] = useState(0);
  const [videoDuration, setvideoDuration] = useState("00:00");
  const isVideo = type === "videos";
  const isChannel = type === "channels";

  useEffect(() => {
    (async function() {
      try {
        // fetch video statistics -to get viewCount, subscribers count and video count-
        const { data } = await getStats(type, id);
        const {
          statistics: { viewCount, subscriberCount, videoCount }
        } = data.items[0];
        setviewCount(millify(viewCount, { precision: 1 }));
        setsubscriberCount(commaNumber(subscriberCount));
        setvideosCount(commaNumber(videoCount));

        // fetch video details -to get videoDuration
        if (isVideo) {
          const {
            data: { items }
          } = await getDuration(id);
          const {
            contentDetails: { duration }
          } = items[0];
          setvideoDuration(parseDuration(duration));
        }
      } catch (e) {
        console.log(e);
      }
    })();
  });

  const {
    snippet: {
      publishedAt,
      title,
      description,
      thumbnails: {
        medium: { url }
      },
      channelTitle
    }
  } = video;
  // plugin: extends relativeTime functionality
  dayjs.extend(relativeTime);

  // to highlite query keyword in description
  const chunks = highlightWords({
    text: description,
    query
  });

  return (
    <div onClick={() => onItemSelect(type, video, id)} className="card">
      <div className={`card__thumbnail ${isChannel && "channel__thumbnail"}`}>
        <img className="card__thumbnail--img" alt="thumbnail" src={url} />
        {isVideo && (
          <>
            <img
              className="card__thumbnail--play"
              alt="play video"
              src={play}
            />
            <span className="card__thumbnail--duration">{videoDuration}</span>
          </>
        )}
      </div>
      <div className={`card__body ${isChannel && "channel__body"}`}>
        <div className="card__body--title">
          {/* Truncate text down to 2 lines only */}
          <Truncate lines={2}>
            {/* innterHtml is set to translate unicode symbols */}
            <h3 dangerouslySetInnerHTML={{ __html: title }}></h3>
          </Truncate>
        </div>
        <div className="card__body--info">
          {isVideo && (
            <>
              <span
                onClick={e => {
                  e.stopPropagation();
                  onItemSelect("channels", video, channelId);
                }}
              >
                {channelTitle}
              </span>
              <span className="separator">•</span>
              <span>{`${viewCount} views`}</span>
              <span className="separator">•</span>
              <span className="card__body--info--date">
                {dayjs(publishedAt).fromNow()}
              </span>
            </>
          )}
          {isChannel && (
            <>
              <span className="card__body--info--vids">{`${videosCount} videos`}</span>
              <span>{`${subscriberCount} subscribers`}</span>
            </>
          )}
        </div>
        <p className="card__body--description">
          <Truncate lines={2}>
            {chunks.map(({ text, match, key }) =>
              match ? (
                <span className="highlight" key={key}>
                  {text}
                </span>
              ) : (
                <span key={key}>{text}</span>
              )
            )}
          </Truncate>
        </p>
      </div>
    </div>
  );
}

export default VideoCard;
