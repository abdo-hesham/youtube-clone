import React, { Component } from "react";
import logo from "../../assets/images/yt.png";
import logoW from "../../assets/images/ytIcon.png";
import search from "../../assets/images/search.svg";
import searchW from "../../assets/images/search-white.svg";
import FiltersHeader from "../filtersHeader/FiltersHeader";
import Media from "react-media";

class Header extends Component {
  state = {
    searchQuery: "",
    showInput: false,
    filter: "",
    smallScreen: false
  };

  input = React.createRef();

  onChange = e => {
    this.setState({ searchQuery: e.target.value });
  };
  // add filter to search
  onAddFilter = (isSmallScreen, filter) => {
    this.setState({ filter }, () => {
      this.onSearch(isSmallScreen, filter);
    });
  };
  // submit search query and filter
  onSearch = (isSmallScreen, filter) => {
    if (!this.state.showInput && isSmallScreen) {
      // show input filed if when search icon clicked
      this.setState({ showInput: true, smallScreen: true }, () => {
        // focus on search input after render
        this.input.current.focus();
      });
    } else {
      // send GET request when search icon clicked again
      const { searchQuery } = this.state;
      const { onHandleSubmit, getQuery } = this.props;
      getQuery(searchQuery);
      onHandleSubmit(searchQuery, filter);
      // remove focus from search input
      if (this.state.showInput) this.input.current.blur();
      setTimeout(
        () => this.setState({ showInput: false, smallScreen: false }),
        500
      );
    }
  };

  onSubmit = (e, isSmallScreen, filter) => {
    e.preventDefault();
    this.onSearch(isSmallScreen, filter);
  };
  render() {
    const { searchQuery, showInput, smallScreen } = this.state;
    const { numberOfResults } = this.props;
    return (
      <>
        <header className="header">
          <Media
            queries={{
              small: "(max-width: 700px)",
              medium: "(min-width: 701px)"
            }}
          >
            {/* matches: conditional rendering according to media queries */}
            {matches => (
              <>
                <div className="header__logo">
                  {matches.small && (
                    <a href="/" title="YouTube Home">
                      <img
                        className="header__logo--img"
                        src={logoW}
                        alt="logo"
                      />
                    </a>
                  )}
                  {matches.medium && (
                    <>
                      <a href="/" title="YouTube Home">
                        <img
                          className="header__logo--img"
                          src={logo}
                          alt="logo"
                        />
                      </a>
                      <span className="header__logo--lang">EG</span>
                    </>
                  )}
                </div>
                <form
                  className="header__form"
                  onSubmit={e => this.onSubmit(e, matches.small)}
                >
                  {(showInput && matches.small) || matches.medium ? (
                    <div className="header__form--search">
                      <input
                        ref={this.input}
                        required
                        type="search"
                        value={searchQuery}
                        placeholder="search here"
                        onChange={this.onChange}
                      />
                    </div>
                  ) : (
                    <h5 onClick={e => this.onSubmit(e, matches.small)}>
                      {searchQuery}
                    </h5>
                  )}
                  <button className="header__form--submit" title="Search">
                    {matches.small && <img src={searchW} alt="search" />}
                    {matches.medium && <img src={search} alt="search" />}
                  </button>
                </form>
              </>
            )}
          </Media>
        </header>
        <FiltersHeader
          numberOfResults={numberOfResults}
          onAddFilter={this.onAddFilter}
          isSmallScreen={smallScreen}
        />
      </>
    );
  }
}

export default Header;
