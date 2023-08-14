import React, { useRef, useState, useEffect } from "react";
import { AppBar,Toolbar,Avatar, Popover, IconButton, makeStyles,} from "@material-ui/core";
import { Menu as MenuIcon, Movie as MovieIcon, ExitToAppSharp as  ExitToAppSharpIcon} from "@material-ui/icons";
import Player from "./components/Player";
import Bookmarks from "./components/Bookmarks";
import { useParams } from "react-router-dom";
import fetchVideoDetails from "./service/fetchYoutubeData";
import "./styles/VideoPlayer.css";
import fetchBookMarks from "./service/fetchBookMarks";
import { Tabs, Tab } from '@material-ui/core';
import Sidebar from "../home/components/Sidebar";
import AiBookmarks from "./components/AiBookmark";
import fetchAIBookMarks from "./service/fetchAiBookmark";
import fetchUserDetail from '../home/service/fetchUserDetail'
import fetchShareBookMarks from "./service/fetchShareBookmark";


const useStyles = makeStyles((theme) => ({
  customPlaceholder: {
    padding: "9px", // Example padding value
    paddingLeft: "14px",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    border: "none",
    width: "30vw",
    marginRight: "0",
    marginLeft: "3rem",
  },
  menuIcon: {
    color: "black",
  },
  homeflexColumn: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "1rem",
  },
}));

export const VideoPlayer = () => {
  
  ///////////////
  useEffect(() => {
    fetchUserDetail(setUserDetail)
  }, []);

  const classes = useStyles()

  const [url, setUrl] = useState(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const [showProfilePopup, setShowProfilePopup] = useState(null)
  const isProfilePopupOpen = Boolean(showProfilePopup)
  const toggleProfilePopup = async (event) => {
    setShowProfilePopup(showProfilePopup ? null : event.currentTarget)
  }

  const [userDetail, setUserDetail] = useState(null)
  function logout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  const getOnHomePage = () => {
    if (window.location.pathname !== '/home') {
      window.location.href = '/home' 
    }
  }

  const handleSubmit = () => {
    window.location.href = `/videos/` + encodeURIComponent(url) + "/false";
  }
  const { video_url } = useParams();
  const { is_shared } = useParams();
  const [bookmarks, setBookmarks] = useState([]);
  const playerRef = useRef(null);
  const controlsRef = useRef(null);
  const [videoId, setVideoId] = useState();
  const [videoDetails, setVideoDetails] = useState({
    videoId: "",
    title: "",
    thumbnail: "",
  });
  useEffect(() => {
    if(is_shared === 'true'){
      fetchShareBookMarks(setBookmarks, video_url, setVideoId);
    }else{
      fetchBookMarks(setBookmarks, video_url, setVideoId);
    }
    fetchVideoDetails(setVideoDetails, video_url);
  }, [is_shared, video_url]);


   const [activeTab, setActiveTab] = useState(0);


   const handleTabChange = (event, newValue) => {
       setActiveTab(newValue);
   };
   const renderTabContent = (tabIndex) => {
       switch (tabIndex) {
         case 0:
           return (<Bookmarks
            bookmarks={bookmarks}
            setBookmarks={setBookmarks}
            playerRef={playerRef}
            controlsRef={controlsRef}
          />);
         case 1:
           return (<AiBookmarks 
            video_url={video_url}
            playerRef={playerRef}
            controlsRef={controlsRef}/>)
         default:
           return null;
       }
   };
   return (
    <div className="parent-div">
      <AppBar position="fixed" variant='outlined' style={{ backgroundColor: 'white' ,border: "none" }}>
        <Toolbar>
          <IconButton color="inherit" onClick={toggleSidebar}>
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <div className='watchwise-div'>
          <img onClick={getOnHomePage} className="toolbar-logo" src="/favicon.ico" alt="Logo"/>
          <h2 onClick={getOnHomePage} className='watchwise-header'>WatchWise</h2>
          </div>
          <div className='search-div'>
              <input 
              placeholder="Enter Video URL"
              onChange={(e) => {
                setUrl(e.target.value)
              }}
              value={url}className='input-url-field' type='text' />
              <button onClick={handleSubmit} className='watch-btn'> 
                <IconButton style={{ padding: '.3rem' }} color="inherit">
                  <MovieIcon />
                </IconButton>
                Watch Now
              </button>
          </div>
          <Avatar
            onClick = {toggleProfilePopup}
            style={{backgroundColor: "#FF5722" ,marginRight: "1rem", height: "2rem", width: "2rem", cursor : "pointer"}}
            sx={{ bgcolor: "#FF5722" }}
            alt="Vaidik"
            src="/broken-image.jpg" >
              {userDetail == null ? '' : <div><p>{userDetail.name[0]}</p>
          </div>}
          </Avatar>
        </Toolbar>
      </AppBar>
      <Popover open={isProfilePopupOpen} anchorEl={showProfilePopup}
        onClose={toggleProfilePopup}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }} >
          { 
            userDetail == null ? 'Loading' : 
              <div className='user-profile-div'>
                <div className='user-details-div'>
                  <Avatar
                    style={{backgroundColor: "#FF5722"}}
                    alt="Vaidik" >
                    <p>{userDetail.name[0]}</p>
                  </Avatar>
                  <div className='name-email-div'>
                    <h3 >{userDetail.name}</h3> 
                    <p>{userDetail.email}</p>
                  </div>
                </div>
                <div className='signout-btn-div'>
                  <ExitToAppSharpIcon className='exit-icon'/>
                  <button className="signout-btn" onClick={logout} >Sign Out</button>
                </div>
                
              </div>
          }
      </Popover>
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
      <div className="player-main-div">
          <div className="player-content-div" style={{ marginLeft: showSidebar ? "18rem" : "0rem", transition: "margin-left 0.3s ease-in-out"}}>
            <div className="video-div">
              <Player bookmarks={bookmarks} setBookmarks={setBookmarks} playerRef={playerRef} controlsRef={controlsRef} url={video_url} videoId={videoId} videoTitle={videoDetails.title}/>
            </div>
            <div className="bookmarks-tabs-div">
              <Tabs style={{marginLeft: "1.5rem"}} value={activeTab} onChange={handleTabChange} >
                <Tab label="My Bookmarks" style={{ color: activeTab === 0 ? 'rgb(246 91 102)' : '#000000' , fontSize: '1rem', fontWeight: '500' }} />
                <Tab label="Recommended" style={{ color: activeTab === 1 ? 'rgb(246 91 102)' : '#000000' , fontSize: '1rem', fontWeight: '500' }} />  
              </Tabs>
              {renderTabContent(activeTab)}
            </div>
          </div>
      </div>
    </div>
  );
};
