import React, { Component } from "react";
import "./App.scss";
import { Header, VideoList, SingleVideo } from "./components";
import { searchVideos } from "./api";
import Loader from "./components/loader/Loader";

export default class App extends Component {
  state = {
    videos: [],
    numberOfResults: null,
    selectedVideo: null,
    query: null,
    loading: false,
    error: null
  };

  onHandleSubmit = async (searchQuery, filter) => {
    this.setState({ loading: true });
    try {
      const {
        data: { pageInfo, items }
      } = await searchVideos(searchQuery, filter);
      this.setState({
        videos: items,
        numberOfResults: pageInfo.totalResults,
        selectedVideo: null,
        loading: false
      });
    } catch (e) {
      console.log(e);
      this.setState({ error: e, loading: false });
    }
  };
  // get query to pass it down to videoCard to be highlighted in description
  getQuery = searchQuery => {
    this.setState({ query: searchQuery });
  };

  showVideoPlayer = item => {
    this.setState({ selectedVideo: item });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };
  // if video, play it. if channel, open it in new page
  onItemSelect = (type, item, id) => {
    switch (type) {
      case "videos":
        this.showVideoPlayer(item);
        break;
      case "channels":
        window.open(`https://www.youtube.com/channel/${id}`);
        break;
      default:
        return null;
    }
  };

  render() {
    const {
      videos,
      numberOfResults,
      selectedVideo,
      query,
      loading,
      error
    } = this.state;
    return (
      <div className="App">
        <Header
          onHandleSubmit={this.onHandleSubmit}
          getQuery={this.getQuery}
          numberOfResults={numberOfResults}
        />map
        <Loader loading={loading} />
        {!error ? (
          !loading && (
            <main className="content">
              {selectedVideo !== null && (
                <SingleVideo
                  video={selectedVideo}
                  onItemSelect={this.onItemSelect}
                />
              )}
              <VideoList
                videos={videos}
                query={query}
                onItemSelect={this.onItemSelect}
              />
            </main>
          )
        ) : (
          <div className="error">
            <p>Something went wrong, please try again!</p>
            <p>Error: {error}</p>
          </div>
        )}
      </div>
    );
  }
}
