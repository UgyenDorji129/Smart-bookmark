import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Avatar,
  Popover,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Movie as MovieIcon,
  ExitToAppSharp as ExitToAppSharpIcon,
} from "@material-ui/icons";
import DailymotionContent from "./components/DailymotionContent";
import SharedBookmarks from "./components/SharedBookmarks";
import fetchUserDetail from "./service/fetchUserDetail";
import YoutubeContent from "./components/YoutubeContent";
import AllContent from "./components/AllContent";
import Sidebar from "./components/Sidebar";
import "./styles/Home.css";

const useStyles = makeStyles((theme) => ({
  menuIcon: {
    color: "black",
  },
}));

const Home = () => {
  useEffect(() => {
    fetchUserDetail(setUserDetail);
  }, []);
  const classes = useStyles();
  const [url, setUrl] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const [showProfilePopup, setShowProfilePopup] = useState(null);
  const isProfilePopupOpen = Boolean(showProfilePopup);
  const toggleProfilePopup = async (event) => {
    setShowProfilePopup(showProfilePopup ? null : event.currentTarget);
  };

  const [userDetail, setUserDetail] = useState(null);
  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  const getOnHomePage = () => {
    if (window.location.pathname !== "/home") {
      window.location.href = "/home";
    }
  };

  const handleSubmit = () => {
    window.location.href = `/videos/` + encodeURIComponent(url) + "/false";
  };

  return (
    <>
      <div>
        <AppBar
          position="fixed"
          variant="outlined"
          style={{ backgroundColor: "white", border: "none" }}
        >
          <Toolbar>
            <IconButton color="inherit" onClick={toggleSidebar}>
              <MenuIcon className={classes.menuIcon} />
            </IconButton>
            <div className="watchwise-div">
              <img
                onClick={getOnHomePage}
                className="toolbar-logo"
                src="favicon.ico"
                alt="Logo"
              />
              <h2 onClick={getOnHomePage} className="watchwise-header">
                WatchWise
              </h2>
            </div>
            <div className="search-div">
              <input
                placeholder="Enter Video URL"
                onChange={(e) => {
                  setUrl(e.target.value);
                }}
                value={url}
                className="input-url-field"
                type="text"
              />
              <button onClick={handleSubmit} className="watch-btn">
                <IconButton style={{ padding: ".3rem" }} color="inherit">
                  <MovieIcon />
                </IconButton>
                Watch Now
              </button>
            </div>
            <Avatar
              onClick={toggleProfilePopup}
              style={{
                backgroundColor: "#FF5722",
                marginRight: "1rem",
                height: "2rem",
                width: "2rem",
                cursor: "pointer",
              }}
              sx={{ bgcolor: "#FF5722" }}
              alt="Vaidik"
              src="/broken-image.jpg"
            >
              {userDetail == null ? (
                ""
              ) : (
                <div>
                  <p>{userDetail.name[0]}</p>
                </div>
              )}
            </Avatar>
          </Toolbar>
        </AppBar>
      </div>
      <Popover
        open={isProfilePopupOpen}
        anchorEl={showProfilePopup}
        onClose={toggleProfilePopup}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {userDetail == null ? (
          "Loading"
        ) : (
          <div className="user-profile-div">
            <div className="user-details-div">
              <Avatar style={{ backgroundColor: "#FF5722" }} alt="Vaidik">
                <p>{userDetail.name[0]}</p>
              </Avatar>
              <div className="name-email-div">
                <h3>{userDetail.name}</h3>
                <p>{userDetail.email}</p>
              </div>
            </div>
            <div className="signout-btn-div">
              <button className="signout-btn" onClick={logout}>
                <ExitToAppSharpIcon className="exit-icon" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </Popover>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="main-body-div">
        <div
          className="content-div"
          style={{
            marginLeft: showSidebar ? "18rem" : "0",
            transition: "margin-left 0.3s ease-in-out",
          }}
        >
          <div className="diff-segments-div" id="all">
            {" "}
            <AllContent />{" "}
          </div>
          <div className="diff-segments-div" id="shared">
            {" "}
            <SharedBookmarks />{" "}
          </div>
          <div className="diff-segments-div" id="youtube">
            <YoutubeContent />
          </div>
          <div className="diff-segments-div" id="dailymotion">
            {" "}
            <DailymotionContent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
