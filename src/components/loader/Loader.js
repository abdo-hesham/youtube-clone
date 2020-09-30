import React from "react";
import Loading from "react-loading-bar";
import "react-loading-bar/dist/index.css";
import Media from "react-media";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ loading }) => {
  return (
    <Media
      queries={{
        small: "(max-width: 700px)",
        medium: "(min-width: 701px)"
      }}
    >
      {matches => (
        <div className="loading">
          {matches.small && (
            <div className="loading__spinner">
              <ClipLoader size={35} color={"#a9a9a9"} loading={loading} />
              {loading && <p>Loading</p>}
            </div>
          )}
          {matches.medium && (
            <Loading show={loading} showSpinner={false} color="#c4302b" />
          )}
        </div>
      )}
    </Media>
  );
};

export default Loader;
