import React from "react";
import VideoCard from "./VideoCard";

function VideoList({ videos, query, onItemSelect }) {
  return (
    <section className="list">
      <div className="list__items">
        {videos.map(video => {
          const {
            id: { kind, videoId },
            snippet: { channelId }
          } = video;
          const id = kind === "youtube#video" ? videoId : channelId;
          const type = kind === "youtube#video" ? "videos" : "channels";
          return (
            <VideoCard
              key={id}
              id={id}
              channelId={channelId}
              type={type}
              video={video}
              query={query}
              onItemSelect={onItemSelect}
            />
          );
        })}
      </div>
    </section>
  );
}

export default VideoList;
